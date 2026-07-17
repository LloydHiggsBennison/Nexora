import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

declare var google: any;

export interface MeetingRequest {
  date: string;       // 'YYYY-MM-DD'
  time: string;       // 'HH:mm'
  email: string;      // correo del cliente
  product: string;    // nombre del producto
}

export interface MeetingResult {
  success: boolean;
  meetLink?: string;
  eventId?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class CalendarService {

  private tokenClient: any = null;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private gisLoaded = false;
  private gisLoadPromise: Promise<void> | null = null;

  // ── Precargar Google Identity Services SDK (llamar al abrir scheduler) ──
  preload(): void {
    if (!this.gisLoadPromise) {
      this.gisLoadPromise = this.loadGis();
    }
  }

  private loadGis(): Promise<void> {
    if (this.gisLoaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      if (existing) {
        this.gisLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.gisLoaded = true;
        this.initTokenClient();
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  // ── Inicializar token client una sola vez ──
  private initTokenClient(): void {
    if (this.tokenClient) return;
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.googleClientId,
      scope: 'https://www.googleapis.com/auth/calendar.events',
      callback: () => {} // Se sobreescribe en cada request
    });
  }

  // ── Verificar si el token actual es válido ──
  private isTokenValid(): boolean {
    return !!this.accessToken && Date.now() < this.tokenExpiry;
  }

  // ── Obtener token (reutiliza si es válido, sino pide uno nuevo) ──
  private getAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      return Promise.resolve(this.accessToken!);
    }

    return new Promise((resolve, reject) => {
      this.tokenClient.callback = (response: any) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        this.accessToken = response.access_token;
        // Token dura ~3600s, guardamos con margen de 5 min
        this.tokenExpiry = Date.now() + (response.expires_in - 300) * 1000;
        resolve(response.access_token);
      };
      this.tokenClient.error_callback = (error: any) => {
        reject(new Error(error.message || 'OAuth error'));
      };
      // prompt '' reutiliza sesión existente; 'consent' fuerza popup
      this.tokenClient.requestAccessToken({ prompt: '' });
    });
  }

  // ── Autorizar (Llamar antes de createMeeting) ──
  async ensureAuthorized(): Promise<void> {
    await (this.gisLoadPromise || this.loadGis());
    this.initTokenClient();
    await this.getAccessToken();
  }

  // ── Crear reunión en Google Calendar ──
  async createMeeting(req: MeetingRequest): Promise<MeetingResult> {
    try {
      // 1. Obtener token (debería ser rápido si ya se llamó a ensureAuthorized)
      const token = await this.getAccessToken();

      // 4. Calcular hora de inicio y fin (30 min)
      const startDateTime = `${req.date}T${req.time}:00`;
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

      const timeZone = 'America/Santiago';

      // 5. Crear evento con Google Meet
      const event = {
        summary: `Reunión Nexora — ${req.product}`,
        description: `Reunión de demostración de ${req.product} con el equipo de Nexora.\n\nSolicitada por: ${req.email}\nProducto: ${req.product}\nDuración: 30 minutos`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone
        },
        attendees: [
          { email: req.email },
          { email: environment.adminEmail }
        ],
        conferenceData: {
          createRequest: {
            requestId: `nexora-${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 15 }
          ]
        },
        guestsCanModify: false,
        guestsCanSeeOtherGuests: true,
        sendUpdates: 'all'
      };

      // 6. Llamar a la API de Google Calendar
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const result = await response.json();
      const meetLink = result.conferenceData?.entryPoints?.find(
        (ep: any) => ep.entryPointType === 'video'
      )?.uri || '';

      return {
        success: true,
        meetLink,
        eventId: result.id
      };

    } catch (error: any) {
      console.error('Calendar API error:', error);
      return {
        success: false,
        error: error.message || 'Error desconocido al crear la reunión'
      };
    }
  }
}
