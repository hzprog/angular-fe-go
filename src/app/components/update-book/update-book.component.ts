import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../Book';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  @Input() book: Book;
  @Output() outputBook: Book;
  @Output() onUpdate = new EventEmitter<Book>();

  showUpdateBook: boolean;

  form: FormGroup;

  constructor(
    private uiService: UiService,
    private bookServices: BookService
  ) {}

  ngOnInit(): void {
    this.uiService
      .onToggle()
      .subscribe((value) => (this.showUpdateBook = value));

    this.form = new FormGroup({
      title: new FormControl(this.book.title, Validators.required),
      isbn: new FormControl(this.book.isbn, Validators.required),
      author: new FormControl(this.book.author, Validators.required),
    });
  }

  onSubmit() {
    const book = {
      title: this.form.get('title')?.value,
      isbn: this.form.get('isbn')?.value,
      author: this.form.get('author')?.value,
    };
    this.bookServices.updateBook(book, this.book.ID).subscribe((book) => {
      this.onUpdate.emit(book);
    });
  }
}
