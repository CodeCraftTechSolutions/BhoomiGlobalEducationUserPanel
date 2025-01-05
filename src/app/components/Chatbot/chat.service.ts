import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://bhoomiglobalapi-gjfdf6dwbzb9h5gw.eastasia-01.azurewebsites.net/api/chat'; // Replace with your .NET Core API URL

  constructor(private http: HttpClient) {}

  sendPrompt(prompt: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.apiUrl, { prompt });
  }
}
