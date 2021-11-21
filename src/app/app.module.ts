import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { AuthguardServiceService } from './services/authguard-service.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { BooksComponent } from './components/books/books.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { GuardGuard } from './guard.guard';
import { RegisterComponent } from './components/register/register.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'signup',
    component: RegisterComponent,
    canActivate: [GuardGuard],
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    BooksComponent,
    BookItemComponent,
    AddBookComponent,
    LoginComponent,
    BookDetailsComponent,
    RegisterComponent,
    UpdateBookComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [AuthguardServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
