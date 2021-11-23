import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../Book';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Output() onDeleteBook: EventEmitter<Book> = new EventEmitter();

  faTimes = faTimes;
  faEdit = faEdit;

  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDeleteDialogue(book: Book) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '250px',
      data: { book },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') this.onDeleteBook.emit(book);
    });
  }

  onEdit(id: any) {
    this.router.navigateByUrl(`books/${Number(id)}`).catch((err) => {
      console.error(err);
    });
  }
}
