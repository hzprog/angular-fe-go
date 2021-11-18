import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthguardServiceService } from './authguard-service.service';

import { Book } from '../Book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8000/api/books';
  private apiRoute = 'http://localhost:8000/api/book/';

  constructor(
    private http: HttpClient,
    private authguardService: AuthguardServiceService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
  };
  httpOptionsPost = {
    headers: new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    ),
  };

  getBooks(): Observable<Book[]> {
    const url = `${this.apiUrl}/10`;
    return this.http.get<Book[]>(url, this.httpOptions);
  }

  deleteBook(book: Book): Observable<string> {
    const url = `${this.apiUrl}/${book.ID}`;
    return this.http.delete<string>(url, this.httpOptions);
  }

  addBook(bookFromdata: FormData): Observable<Book> {
    return this.http.post<any>(this.apiUrl, bookFromdata, this.httpOptionsPost);
  }
  getBook(bookId: any): Observable<Book> {
    const url = `${this.apiRoute + bookId}`;
    return this.http.get<any>(url, this.httpOptionsPost);
  }
}
