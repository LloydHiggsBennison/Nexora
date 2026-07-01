variable "aws_region" {
  description = "Región de AWS para el despliegue (AWS Academy requiere us-east-1)"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t3.small" # t3.small provee 2 vCPUs y 2GB RAM, permitida en Academy
}

variable "github_repository" {
  description = "Ruta de tu repositorio en GitHub para clonarlo y descargar imágenes"
  type        = string
  default     = "LloydHiggsBennison/Nexora"
}
