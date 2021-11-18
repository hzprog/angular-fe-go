import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthguardServiceService {
  constructor(private router: Router) {}
  getToken() {
    let token: string | null = localStorage.getItem('token');
    let pass: boolean = false;

    if (token) {
      var decodedToken: any = jwt_decode(token);

      var dateOfNow: any = new Date();
      var expirationDate: any = new Date(decodedToken.exp * 1000);

      if (expirationDate > dateOfNow) {
        pass = true;
      } else {
        localStorage.removeItem('token');
      }
    }

    return pass;
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
