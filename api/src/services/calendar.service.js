const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Verifica si existe el archivo de credenciales de la Service Account
const credentialsPath = path.join(__dirname, '../../credentials.json');
let auth = null;
let calendar = null;

if (fs.existsSync(credentialsPath)) {
  auth = new google.auth.GoogleAuth({
    keyFile: credentialsPath,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });
  calendar = google.calendar({ version: 'v3', auth });
} else {
  console.warn('[Calendar] ADVERTENCIA: No se encontró credentials.json. El modo mock está activo.');
}

async function createMeeting({ date, time, email, service }) {
  const [hour, minute] = time.split(':');
  
  // Asumimos hora local en Chile (America/Santiago). Esto debería manejarse mejor según el cliente.
  // Por simplicidad, armamos la fecha ISO:
  const startDateTime = new Date(`${date}T${time}:00-04:00`); // UTC-4 (Invierno Chile) o -3 (Verano). Ajustar según momento del año.
  
  const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutos

  if (!calendar) {
    // Modo Mock para desarrollo local si no hay credenciales
    console.log(`[Calendar Mock] Evento creado simulado para ${email} el ${date} a las ${time}`);
    return {
      meetLink: 'https://meet.google.com/mock-link-123'
    };
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nexora.cl';

    const event = {
      summary: `Nexora Consultoría - ${service === 'general' ? 'General' : service.toUpperCase()}`,
      description: `Reunión agendada desde la web de Nexora.\nCliente: ${email}\nProducto: ${service}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'America/Santiago',
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'America/Santiago',
      },
      // Removemos 'attendees' porque las Cuentas de Servicio gratuitas no pueden invitar sin Domain-Wide Delegation.
      // En su lugar, Resend enviará el correo con el link de Meet al cliente de forma independiente.
      conferenceData: {
        createRequest: {
          requestId: `nexora-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    // Usar el correo del administrador como calendarId, no 'primary' (que sería el de la Service Account).
    // De esta forma, el evento se crea directamente en el calendario del administrador.
    const calendarId = process.env.CALENDAR_ID || adminEmail || 'primary';

    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      conferenceDataVersion: 1, // Requerido para generar link de Meet
      // sendUpdates: 'all' // Comentado porque ya no estamos enviando invites de Google, usamos Resend.
    });

    console.log(`[Calendar] Evento creado: ${response.data.htmlLink}`);
    
    return {
      meetLink: response.data.hangoutLink
    };

  } catch (error) {
    console.error('[Calendar Error] Error al crear el evento:', error);
    throw new Error('No se pudo crear el evento en el calendario');
  }
}

module.exports = {
  createMeeting
};
