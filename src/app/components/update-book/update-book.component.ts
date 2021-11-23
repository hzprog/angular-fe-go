import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../Book';
import { BookService } from '../../services/books.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  @Input() book: Book;
  @Output() outputBook: Book;
  @Output() onUpdate = new EventEmitter<Book>();

  form: FormGroup;

  constructor(
    private bookServices: BookService,
    public dialogRef: MatDialogRef<BookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.book)
      this.form = new FormGroup({
        title: new FormControl(this.data.book.title, Validators.required),
        isbn: new FormControl(this.data.book.isbn, Validators.required),
        author: new FormControl(this.data.book.author, Validators.required),
      });
  }

  onSubmit() {
    const book = {
      title: this.form.get('title')?.value,
      isbn: this.form.get('isbn')?.value,
      author: this.form.get('author')?.value,
    };

    this.bookServices.updateBook(book, this.data.book.ID).subscribe((book) => {
      this.dialogRef.close(book);
    });
  }
}
