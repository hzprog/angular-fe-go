import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  login(loginFromData: any): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, loginFromData);
  }

  register(registerFromData: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, registerFromData);
  }
}
