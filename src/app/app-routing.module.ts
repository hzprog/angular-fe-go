import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './guards/guard.guard';
import { RegisterComponent } from './components/register/register.component';
import { BooksComponent } from './components/books/books.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { BookDetailsComponent } from './components/book-details/book-details.component';

const routes: Routes = [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
