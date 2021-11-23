import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
import { Book } from '../../Book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  formData: FormData;
  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
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

  openAddDialog() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      data: {
        formData: this.formData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.addBook(result);
    });
  }
}
