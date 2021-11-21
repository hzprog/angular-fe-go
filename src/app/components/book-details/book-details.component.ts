import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/Book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  id: any;
  book: Book;
  hz: Book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BookService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getBook();
  }

  test(book: any) {
    // console.log(book);
    this.book = book;
  }

  getBook() {
    this.booksService.getBook(this.id).subscribe((book) => (this.book = book));
  }
}
