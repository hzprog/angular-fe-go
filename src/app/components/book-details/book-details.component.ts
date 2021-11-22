import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/books.service';
import { UiService } from '../../services/ui.service';

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
    private uiService: UiService,
    private booksService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getBook();
  }

  updateUi(book: any) {
    this.book = book;
  }

  getBook() {
    this.booksService.getBook(this.id).subscribe((book) => (this.book = book));
  }

  goToBooks() {
    this.router.navigateByUrl('/books').catch((err) => {
      console.log(err);
    });
  }
  test() {
    this.uiService.toggleUpdateTask();
  }
}
