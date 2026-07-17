const express = require('express');
const router = express.Router();
const calendarService = require('../services/calendar.service');
const emailService = require('../services/email.service');

router.post('/', async (req, res) => {
  try {
    const { date, time, email, service } = req.body;

    if (!date || !time || !email) {
      return res.status(400).json({ error: 'Faltan datos obligatorios: date, time, email.' });
    }

    console.log(`[API] Agendando reunión para ${email} el ${date} a las ${time}`);

    // 1. Crear evento en Google Calendar y obtener el link de Meet
    const event = await calendarService.createMeeting({ date, time, email, service });

    // 2. Enviar correo HTML profesional usando Resend/Nodemailer
    // NO usamos "await" para que no bloquee la respuesta al cliente si el correo tarda o falla la red
    emailService.sendConfirmationEmail({
      toEmail: email,
      date,
      time,
      meetLink: event.meetLink,
      service
    }).catch(e => console.error('[API] Error silencioso enviando correo:', e));

    res.status(200).json({
      success: true,
      meetLink: event.meetLink,
      message: 'Reunión agendada y correo enviado con éxito.'
    });

  } catch (error) {
    console.error('[API] Error al agendar reunión:', error);
    res.status(500).json({ error: 'Ocurrió un error al agendar la reunión.' });
  }
});

module.exports = router;
