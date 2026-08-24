terraform {
  required_version = ">= 1.5.0"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

locals {
  project_name = "devsecops-demo"
}

output "project_name" {
  value = local.project_name
}

output "environment" {
  value = var.environment
}
