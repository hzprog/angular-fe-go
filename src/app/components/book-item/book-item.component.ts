import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../Book';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onDelete(book: Book) {
    this.onDeleteBook.emit(book);
  }

  onEdit(id: any) {
    this.router.navigateByUrl(`books/${Number(id)}`).catch((err) => {
      console.error(err);
    });
  }
}
