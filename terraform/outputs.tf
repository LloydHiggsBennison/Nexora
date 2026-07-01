output "public_ip" {
  description = "Dirección IP pública del servidor de producción"
  value       = aws_instance.nexora_server.public_ip
}

output "website_url" {
  description = "URL para acceder a la aplicación"
  value       = "http://${aws_instance.nexora_server.public_ip}"
}
