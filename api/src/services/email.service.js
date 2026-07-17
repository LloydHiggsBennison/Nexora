const { Resend } = require('resend');
const nodemailer = require('nodemailer');

const hasResendApiKey = !!process.env.RESEND_API_KEY;
const resend = hasResendApiKey ? new Resend(process.env.RESEND_API_KEY) : null;

// Configuración de Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER || process.env.ADMIN_EMAIL,
    pass: process.env.GMAIL_PASS
  }
});

async function sendConfirmationEmail({ toEmail, date, time, meetLink, service }) {
  const subject = `Reserva de Reunión Confirmada - Nexora`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reunión Confirmada</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4f5f7; margin: 0; padding: 0; color: #333; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #111019 0%, #1e1d2b 100%); padding: 40px 30px; text-align: center; }
        .header img { height: 40px; margin-bottom: 20px; }
        .header h1 { color: #ffffff; font-size: 24px; margin: 0; font-weight: 600; }
        .content { padding: 40px 30px; }
        .content p { font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #555; }
        .details-box { background-color: #f9f9fb; border: 1px solid #eef0f4; border-radius: 8px; padding: 25px; margin-bottom: 30px; }
        .details-row { display: flex; margin-bottom: 15px; }
        .details-row:last-child { margin-bottom: 0; }
        .details-label { font-weight: 600; width: 100px; color: #333; }
        .details-value { color: #666; }
        .btn-wrapper { text-align: center; margin-top: 30px; }
        .btn { display: inline-block; background-color: #7C6DFA; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; }
        .btn:hover { background-color: #6957fa; }
        .footer { text-align: center; padding: 30px; background-color: #f9f9fb; font-size: 14px; color: #888; border-top: 1px solid #eef0f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: #7C6DFA;">NEXORA</h1>
          <h1>¡Reunión Confirmada!</h1>
        </div>
        
        <div class="content">
          <p>Hola,</p>
          <p>Tu reunión de consultoría tecnológica con el equipo directivo de Nexora ha sido agendada con éxito. A continuación, encontrarás los detalles de nuestra cita:</p>
          
          <div class="details-box">
            <div class="details-row">
              <div class="details-label">Fecha:</div>
              <div class="details-value">${date}</div>
            </div>
            <div class="details-row">
              <div class="details-label">Hora:</div>
              <div class="details-value">${time} (Hora de Chile)</div>
            </div>
            ${service && service !== 'general' ? `
            <div class="details-row">
              <div class="details-label">Interés:</div>
              <div class="details-value">${service.toUpperCase()}</div>
            </div>
            ` : ''}
          </div>
          
          <div class="btn-wrapper">
            <a href="${meetLink}" class="btn">Entrar a Google Meet</a>
          </div>
          
          <p style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
            El evento también ha sido añadido a tu calendario junto con los recordatorios. Si necesitas reagendar, por favor responde a este correo.
          </p>
        </div>
        
        <div class="footer">
          &copy; ${new Date().getFullYear()} Nexora SpA. Soluciones Tecnológicas B2B.<br>
          Santiago, Chile
        </div>
      </div>
    </body>
    </html>
  `;

  // Lógica para elegir el proveedor de correos (Resend vs Nodemailer)
  const provider = process.env.EMAIL_PROVIDER || 'nodemailer'; // Por defecto usaremos nodemailer por ahora

  if (provider === 'resend') {
    if (!hasResendApiKey) {
      console.log(`[Email Mock] Simulando envío a ${toEmail}. Link: ${meetLink}`);
      return { id: 'mock-id' };
    }

    try {
      const response = await resend.emails.send({
        from: 'Nexora <hola@nexora.cl>', // IMPORTANTE: nexora.cl debe estar verificado en Resend
        to: [toEmail],
        subject: subject,
        html: htmlContent,
      });
      
      if (response.error) {
        console.error('[Email Error] Resend rechazó el correo:', response.error);
        return null;
      }

      console.log(`[Email] Correo enviado por Resend a ${toEmail} con ID: ${response.data.id}`);
      return response.data;
    } catch (error) {
      console.error('[Email Error] Error crítico enviando correo con Resend:', error);
      return null;
    }
  } else {
    // Modo Nodemailer (Gmail)
    if (!process.env.GMAIL_PASS) {
      console.log(`[Email Mock] Simulando envío (Falta GMAIL_PASS) a ${toEmail}. Link: ${meetLink}`);
      return { id: 'mock-id' };
    }

    try {
      const info = await transporter.sendMail({
        from: `"Nexora Consultoría" <${process.env.GMAIL_USER || process.env.ADMIN_EMAIL}>`,
        to: toEmail,
        subject: subject,
        html: htmlContent
      });

      console.log(`[Email] Correo enviado por Nodemailer a ${toEmail} con ID: ${info.messageId}`);
      return info;
    } catch (error) {
      console.error('[Email Error] Error enviando correo con Nodemailer:', error);
      return null;
    }
  }
}

module.exports = {
  sendConfirmationEmail
};
