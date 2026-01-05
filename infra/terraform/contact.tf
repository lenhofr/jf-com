locals {
  contact_allowed_origins = [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
    "http://localhost:5173",
  ]

  contact_throttling_rate  = 5
  contact_throttling_burst = 10
}

resource "aws_dynamodb_table" "contact_messages" {
  name         = "${var.project_name}-contact-messages"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"
  tags         = var.tags

  attribute {
    name = "id"
    type = "S"
  }
}

data "archive_file" "contact_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/contact"
  output_path = "${path.module}/.terraform/contact-lambda.zip"
}

resource "aws_iam_role" "contact_lambda" {
  name = "${var.project_name}-contact-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      },
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "contact_lambda_basic" {
  role       = aws_iam_role.contact_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "contact_lambda_dynamo" {
  name = "${var.project_name}-contact-lambda-dynamo"
  role = aws_iam_role.contact_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
        ]
        Resource = aws_dynamodb_table.contact_messages.arn
      },
    ]
  })
}

resource "aws_lambda_function" "contact" {
  function_name = "${var.project_name}-contact"
  role          = aws_iam_role.contact_lambda.arn

  runtime = "python3.12"
  handler = "handler.handler"

  filename         = data.archive_file.contact_lambda.output_path
  source_code_hash = data.archive_file.contact_lambda.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.contact_messages.name
    }
  }

  tags = var.tags
}

resource "aws_apigatewayv2_api" "contact" {
  name          = "${var.project_name}-contact"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = local.contact_allowed_origins
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }

  tags = var.tags
}

resource "aws_apigatewayv2_integration" "contact" {
  api_id                 = aws_apigatewayv2_api.contact.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.contact.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "contact" {
  api_id    = aws_apigatewayv2_api.contact.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_stage" "contact" {
  api_id      = aws_apigatewayv2_api.contact.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_rate_limit  = local.contact_throttling_rate
    throttling_burst_limit = local.contact_throttling_burst
  }

  tags = var.tags
}

resource "aws_lambda_permission" "contact_apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.contact.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.contact.execution_arn}/*/*"
}
