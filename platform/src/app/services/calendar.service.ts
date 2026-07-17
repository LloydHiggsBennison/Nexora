import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

export interface MeetingRequest {
  date: string;       // 'YYYY-MM-DD'
  time: string;       // 'HH:mm'
  email: string;      // visitor's email
  service?: string;   // 'general' or specific product
}

export interface MeetingResult {
  success: boolean;
  meetLink?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private http = inject(HttpClient);
  
  // Endpoint del backend. Se lee del environment.
  // Si no está definido, usa un default para desarrollo local.
  private apiUrl = environment.apiUrl || 'http://localhost:3000/api';

  constructor() {}

  /**
   * Envía la solicitud de agendamiento al Backend de Nexora.
   * El Backend se encargará de crear el evento en Google Calendar usando 
   * Service Accounts y de enviar el correo electrónico con Resend.
   */
  async createMeeting(req: MeetingRequest): Promise<MeetingResult> {
    try {
      const response = await firstValueFrom(
        this.http.post<MeetingResult>(`${this.apiUrl}/schedule`, req)
      );
      
      return response;
    } catch (error: any) {
      console.error('[Frontend] Error llamando al API de agendamiento:', error);
      throw new Error(error.error?.error || 'Ocurrió un error al contactar al servidor');
    }
  }
}
