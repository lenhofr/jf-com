locals {
  signup_allowed_origins = [
    "https://${var.domain_name}",
    "https://www.${var.domain_name}",
    "http://localhost:5173",
  ]

  signup_throttling_rate  = 5
  signup_throttling_burst = 10
}

resource "aws_dynamodb_table" "signups" {
  name         = "${var.project_name}-signups"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "email"
  tags         = var.tags

  attribute {
    name = "email"
    type = "S"
  }
}

data "archive_file" "signup_lambda" {
  type        = "zip"
  source_dir  = "${path.module}/lambda/signup"
  output_path = "${path.module}/.terraform/signup-lambda.zip"
}

resource "aws_iam_role" "signup_lambda" {
  name = "${var.project_name}-signup-lambda"

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

resource "aws_iam_role_policy_attachment" "signup_lambda_basic" {
  role       = aws_iam_role.signup_lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy" "signup_lambda_dynamo" {
  name = "${var.project_name}-signup-lambda-dynamo"
  role = aws_iam_role.signup_lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
        ]
        Resource = aws_dynamodb_table.signups.arn
      },
    ]
  })
}

resource "aws_lambda_function" "signup" {
  function_name = "${var.project_name}-signup"
  role          = aws_iam_role.signup_lambda.arn

  runtime = "python3.12"
  handler = "handler.handler"

  filename         = data.archive_file.signup_lambda.output_path
  source_code_hash = data.archive_file.signup_lambda.output_base64sha256

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.signups.name
    }
  }

  tags = var.tags
}

resource "aws_apigatewayv2_api" "signup" {
  name          = "${var.project_name}-signup"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = local.signup_allowed_origins
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
    max_age       = 3600
  }

  tags = var.tags
}

resource "aws_apigatewayv2_integration" "signup" {
  api_id                 = aws_apigatewayv2_api.signup.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.signup.invoke_arn
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "signup" {
  api_id    = aws_apigatewayv2_api.signup.id
  route_key = "POST /signup"
  target    = "integrations/${aws_apigatewayv2_integration.signup.id}"
}

resource "aws_apigatewayv2_stage" "signup" {
  api_id      = aws_apigatewayv2_api.signup.id
  name        = "$default"
  auto_deploy = true

  default_route_settings {
    throttling_rate_limit  = local.signup_throttling_rate
    throttling_burst_limit = local.signup_throttling_burst
  }

  tags = var.tags
}

resource "aws_lambda_permission" "signup_apigw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.signup.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.signup.execution_arn}/*/*"
}

