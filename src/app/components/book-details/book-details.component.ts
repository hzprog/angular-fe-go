import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/books.service';
import { UiService } from '../../services/ui.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBookComponent } from '../update-book/update-book.component';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  id: any;
  book: Book;
  hz: Book;
  formData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private uiService: UiService,
    private booksService: BookService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getBook();
  }

  updateUi(result: any) {
    this.book = result.data.book;
  }

  getBook() {
    this.booksService
      .getBook(this.id)
      .subscribe((book) => (this.book = book.data.book));
  }

  goToBooks() {
    this.router.navigateByUrl('/books').catch((err) => {
      console.log(err);
    });
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      data: {
        book: this.book,
        formData: this.formData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.updateUi(result);
    });
  }
}
