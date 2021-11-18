import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/api/signin';

  constructor(private http: HttpClient) {}

  login(loginFromdata: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, loginFromdata);
  }
}
