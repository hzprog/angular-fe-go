import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginServices: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSignup() {
    this.router.navigateByUrl('/signup').catch((err) => {
      console.error(err);
    });
  }

  onSubmit() {
    const loginCredentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    this.loginServices.login(loginCredentials).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        this.router.navigateByUrl('/books').catch((err) => {
          console.error(err);
        });
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
      }
    );
  }
}
