import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
import { Book } from '../../Book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { AuthguardServiceService } from '../../services/authguard-service.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'title', 'isbn', 'image', 'actions'];
  @ViewChild(MatTable) table: MatTable<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  books: MatTableDataSource<Book>;
  lengthOfBooks: number = 500;
  pageSize: number = 5;
  formData: FormData;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private authGuard: AuthguardServiceService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.books.paginator = this.paginator;
  }

  ngAfterViewInit() {
    // this.books.paginator?.page.subscribe(() => console.log('working'));
  }

  getBooks() {
    this.bookService.getBooks(this.pageSize, 0).subscribe((result) => {
      this.books = result.books;
      this.lengthOfBooks = result.total;
      this.table.renderRows();
    });
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe(() => {
      this.books.data = this.books.data.filter((b) => b.ID !== book.ID);
    });
  }

  addBook(book: FormData) {
    this.bookService.addBook(book).subscribe((book) => {
      this.books.data.push(book);
      this.table.renderRows();
    });
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

  openDeleteDialogue(book: Book) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '400px',
      data: { book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') this.deleteBook(book);
    });
  }

  signOut() {
    this.authGuard.signOut();
  }
}
