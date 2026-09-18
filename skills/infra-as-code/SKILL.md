---
name: infra-as-code
description: Use when authoring, modifying, or reviewing Infrastructure as Code (Terraform, OpenTofu, Pulumi, CloudFormation) configurations.
---

# Infrastructure as Code (IaC) Protocol

Infrastructure must be defined declaratively, version-controlled, auditable, and reproducible across environments.

---

## 1. Core Principles of IaC

1. **Plan Before Apply (Always)**:
   Never run `terraform apply` or `pulumi up` without reviewing the exact plan output.
   - Verify: How many resources will be **Added (+)**, **Modified (~)**, or **Destroyed (-)**?
   - Any unexpected resource destruction must halt execution immediately.
2. **State File Safety**:
   - Store state in remote backends with encryption-at-rest and state locking (e.g. AWS S3 + DynamoDB table lock, or Terraform Cloud).
   - Never commit `.tfstate` files to version control.
3. **Module Reusability**:
   - Encapsulate repeated topologies (VPC, ECS service, RDS instance) into versioned modules.
   - Keep modules focused with strict input variable types and explicit outputs.

---

## 2. Terraform Code Style & Conventions

```hcl
# Standard resource declaration with explicit lifecycle protection
resource "aws_rds_cluster" "primary" {
  cluster_identifier      = "${var.environment}-aurora-pg"
  engine                  = "aurora-postgresql"
  engine_version          = "16.1"
  database_name           = var.database_name
  master_username         = var.db_master_user
  master_password         = var.db_master_password
  backup_retention_period = 30
  storage_encrypted       = true
  deletion_protection     = var.environment == "prod" ? true : false

  lifecycle {
    prevent_destroy = true # Safeguard against accidental destruction
  }

  tags = merge(var.common_tags, {
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}
```

---

## 3. IaC Review Checklist
- [ ] Are all variables typed (`type = string`, `type = list(string)`) with descriptions?
- [ ] Are production resources tagged with `Environment`, `Owner`, and `Service`?
- [ ] Is `deletion_protection` enabled for primary databases and stateful disks?
- [ ] Is least-privilege enforced on all IAM roles and security group ingress rules (no `0.0.0.0/0` on port 22/5432)?
