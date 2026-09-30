import base64
import json
import os
import re
import uuid
from datetime import datetime, timezone

import boto3

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
_LINE_BREAKS = re.compile(r"[\r\n]+")


def _json(status_code: int, payload: dict):
    return {
        "statusCode": status_code,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(payload),
    }


def _one_line(value: str, limit: int) -> str:
    """Collapse to a single line so visitor input can never add email headers."""
    return _LINE_BREAKS.sub(" ", value).strip()[:limit]


def _send_alert(item: dict) -> None:
    """Email the stored message to ALERT_TO (comma-separated). No-op when unset."""
    to_addrs = [a.strip() for a in os.environ.get("ALERT_TO", "").split(",") if a.strip()]
    from_addr = os.environ.get("ALERT_FROM", "")
    if not to_addrs or not from_addr:
        return

    name = item.get("name", "")
    topic = item.get("subject", "")
    who = _one_line(name, 80) or item["email"]
    subject = f"Website inquiry from {who}"
    if topic:
        subject += f" — {_one_line(topic, 80)}"

    body = "\n".join(
        [
            "New message from the contact form on jesseforeman.com.",
            "Reply to this email to answer the sender directly.",
            "",
            f"Name:     {_one_line(name, 200) or '(not given)'}",
            f"Email:    {item['email']}",
            f"Topic:    {_one_line(topic, 200) or '(not given)'}",
            f"Received: {item['createdAt']}",
            "",
            item["message"],
            "",
            "--",
            f"Saved in DynamoDB table {os.environ['TABLE_NAME']} as id {item['id']}.",
        ]
    )

    boto3.client("sesv2").send_email(
        FromEmailAddress=from_addr,
        Destination={"ToAddresses": to_addrs},
        ReplyToAddresses=[item["email"]],
        Content={
            "Simple": {
                "Subject": {"Data": subject, "Charset": "UTF-8"},
                "Body": {"Text": {"Data": body, "Charset": "UTF-8"}},
            }
        },
    )


def handler(event, context):
    try:
        body_raw = event.get("body") or "{}"
        if event.get("isBase64Encoded"):
            body_raw = base64.b64decode(body_raw).decode("utf-8")

        body = json.loads(body_raw) if isinstance(body_raw, str) else (body_raw or {})

        honeypot = body.get("website")
        if isinstance(honeypot, str) and honeypot.strip():
            return _json(400, {"ok": False, "error": "invalid"})

        email_raw = body.get("email")
        if not isinstance(email_raw, str) or not _EMAIL_RE.match(email_raw.strip()):
            return _json(400, {"ok": False, "error": "invalid_email"})
        email = email_raw.strip().lower()

        message_raw = body.get("message")
        if not isinstance(message_raw, str) or not message_raw.strip():
            return _json(400, {"ok": False, "error": "invalid_message"})
        message = message_raw.strip()

        name_raw = body.get("name")
        name = name_raw.strip() if isinstance(name_raw, str) else ""

        subject_raw = body.get("subject")
        subject = subject_raw.strip() if isinstance(subject_raw, str) else ""

        now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

        item = {
            "id": str(uuid.uuid4()),
            "createdAt": now,
            "email": email,
            "message": message,
        }
        if name:
            item["name"] = name
        if subject:
            item["subject"] = subject

        table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
        table.put_item(Item=item)

        # The message is already saved, so a failed alert must not fail the
        # visitor's submission. Log only the id: message bodies stay out of logs.
        try:
            _send_alert(item)
        except Exception as exc:  # noqa: BLE001
            print(f"CONTACT_ALERT_FAILED id={item['id']} error={type(exc).__name__}: {exc}")

        return _json(200, {"ok": True})
    except Exception:
        return _json(500, {"ok": False, "error": "server_error"})
