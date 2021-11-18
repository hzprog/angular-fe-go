import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
// import { Task } from '../../Task';
import { Book } from '../../Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe(() => {
      this.books = this.books.filter((b) => b.ID !== book.ID);
    });
  }

  addBook(book: FormData) {
    this.bookService.addBook(book).subscribe((book) => this.books.push(book));
  }
}
