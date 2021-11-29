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
  hide: boolean = true;
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // username = new FormControl('', [Validators.required, Validators.email]);

  constructor(private loginServices: LoginService, private router: Router) {}

  ngOnInit(): void {}

  onSignup() {
    this.router.navigateByUrl('/signup').catch((err) => {
      console.error(err);
    });
  }

  // getErrorMessage() {
  //   if (this.username.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.username.hasError('username') ? 'Not a valid username' : '';
  // }

  onSubmit() {
    const loginCredentials = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    };

    this.loginServices.login(loginCredentials).subscribe(
      (result) => {
        localStorage.setItem('token', result.data);
        this.router.navigateByUrl('/books').catch((err) => {
          console.error(err);
        });
      },
      (err: any) => {
        alert(err.error.error.message);
      }
    );
  }
}
