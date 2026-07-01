terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -----------------------------------------------------------
# Buscar la última imagen (AMI) de Ubuntu 24.04 LTS
# -----------------------------------------------------------
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # ID oficial de Canonical (Ubuntu)

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

# -----------------------------------------------------------
# Security Group: Permite tráfico web (80) y acceso SSH (22)
# -----------------------------------------------------------
resource "aws_security_group" "nexora_sg" {
  name        = "nexora-sg"
  description = "Permitir trafico HTTP y SSH"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Nexora-SG"
  }
}

# -----------------------------------------------------------
# Instancia EC2
# -----------------------------------------------------------
resource "aws_instance" "nexora_server" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = var.instance_type
  key_name             = "vockey" # Llave predeterminada de AWS Academy
  iam_instance_profile = "LabInstanceProfile" # Perfil requerido por AWS Academy

  vpc_security_group_ids = [aws_security_group.nexora_sg.id]

  # Configuración del disco (EBS)
  root_block_device {
    volume_size = 20 # 20 GB es suficiente
    volume_type = "gp3" # gp3 es más rápido y eficiente que gp2
  }

  # User Data simplificado para levantar la aplicación Angular vía Docker
  user_data = <<-EOF
    #!/bin/bash
    # Actualizar sistema e instalar dependencias
    apt-get update -y
    apt-get install -y docker.io docker-compose-v2 git

    # Clonar el repositorio
    cd /home/ubuntu
    git clone -b main https://github.com/${var.github_repository}.git nexora
    cd nexora

    # Levantar los contenedores de producción (construyendo la imagen localmente)
    docker compose -f docker-compose.prod.yml up -d --build

    # Cambiar propietario para que el usuario ubuntu pueda acceder
    chown -R ubuntu:ubuntu /home/ubuntu/nexora
  EOF

  tags = {
    Name = "Nexora-Server"
  }
}
