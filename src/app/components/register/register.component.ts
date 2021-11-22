import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private loginServices: LoginService) {}

  ngOnInit(): void {}

  onRegister() {
    const registerCredentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    this.loginServices.register(registerCredentials).subscribe({
      next: (result) => {
        localStorage.setItem('token', result.token);
        console.log(result.token);
        this.router.navigateByUrl('/books').catch((err) => {
          console.error(err);
        });
      },
      error: (err: HttpErrorResponse) => {
        alert(err.error);
      },
    });
  }

  onSignIn() {
    this.router.navigateByUrl('/login').catch((err) => {
      console.error(err);
    });
  }
}
