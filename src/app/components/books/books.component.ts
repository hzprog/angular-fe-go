import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/services/books.service';
import { Book } from '../../Book';
import { MatDialog } from '@angular/material/dialog';
import { AddBookComponent } from '../add-book/add-book.component';
import { AuthguardServiceService } from '../../services/authguard-service.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogImageComponent } from '../dialog-image/dialog-image.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = [
    'ID',
    'title',
    'isbn',
    'author',
    'image',
    'actions',
  ];

  @ViewChild(MatTable) table: MatTable<Book>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Book[]>;
  books: Book[];
  lengthOfBooks: number = 500;
  pageSize: number = 5;
  formData: FormData;
  pageIndex: number = 0;

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private authGuard: AuthguardServiceService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getBooks(this.pageSize, 0);
  }

  getBooks(limit: any, offset: any) {
    this.bookService.getBooks(limit, offset).subscribe((result) => {
      this.books = result.data.books;
      this.lengthOfBooks = result.data.total;

      this.dataSource = new MatTableDataSource<any>(this.books);
      this.dataSource.paginator = this.paginator;
    });
  }

  getNextBooks(limit: any, offset: any) {
    this.bookService.getBooks(limit, offset).subscribe((result) => {
      this.books = result.data.books;

      this.dataSource = new MatTableDataSource<any>(this.books);
    });
  }

  deleteBook(book: Book) {
    this.bookService.deleteBook(book).subscribe(() => {
      this.books = this.books.filter((b) => b.ID !== book.ID);
      this.dataSource = new MatTableDataSource<any>(this.books);
    });
  }

  addBook(book: FormData) {
    this.bookService.addBook(book).subscribe((result) => {
      this.books.push(result.data.book);
      this.dataSource = new MatTableDataSource<any>(this.books);
      this.lengthOfBooks++;
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

  openImageDialog(image: string) {
    const dialogRef = this.dialog.open(DialogImageComponent, {
      data: {
        url: image,
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

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let offset = this.pageSize * this.pageIndex;

    this.getNextBooks(this.pageSize, offset);
  }
}
