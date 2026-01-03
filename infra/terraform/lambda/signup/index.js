/* eslint-disable @typescript-eslint/no-var-requires */

const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient();

const isValidEmail = (email) => {
  if (typeof email !== "string") return false;
  const e = email.trim();
  if (!e) return false;
  // Minimal sanity check; UI already uses <input type="email">.
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);
};

exports.handler = async (event) => {
  try {
    const body = event && event.body ? JSON.parse(event.body) : {};

    const emailRaw = body.email;
    const honeypot = body.website;

    if (typeof honeypot === "string" && honeypot.trim().length > 0) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "invalid" }),
      };
    }

    if (!isValidEmail(emailRaw)) {
      return {
        statusCode: 400,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ok: false, error: "invalid_email" }),
      };
    }

    const email = emailRaw.trim().toLowerCase();
    const now = new Date().toISOString();

    await docClient
      .update({
        TableName: process.env.TABLE_NAME,
        Key: { email },
        UpdateExpression:
          "SET updatedAt = :now, createdAt = if_not_exists(createdAt, :now)",
        ExpressionAttributeValues: {
          ":now": now,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: false, error: "server_error" }),
    };
  }
};
