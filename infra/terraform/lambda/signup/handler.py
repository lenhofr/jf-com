import base64
import json
import os
import re
from datetime import datetime, timezone

import boto3

_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _json(status_code: int, payload: dict):
    return {
        "statusCode": status_code,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(payload),
    }


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
        now = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")

        table = boto3.resource("dynamodb").Table(os.environ["TABLE_NAME"])
        table.update_item(
            Key={"email": email},
            UpdateExpression="SET updatedAt = :now, createdAt = if_not_exists(createdAt, :now)",
            ExpressionAttributeValues={":now": now},
        )

        return _json(200, {"ok": True})
    except Exception:
        return _json(500, {"ok": False, "error": "server_error"})
