import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { Book } from '../../Book';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  @Output() onAddBook: EventEmitter<FormData> = new EventEmitter();

  image: any;
  showAddBook: boolean;
  subscription: Subscription;

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<AddBookComponent>) {}

  ngOnInit(): void {}

  handleFileInput(files: any) {
    this.image = files.target.files[0];
  }

  onSubmit() {
    const book = {
      title: this.form.get('title')?.value,
      isbn: this.form.get('isbn')?.value,
      author: this.form.get('author')?.value,
      image: this.image,
    };

    const bookFormData: FormData = new FormData();

    bookFormData.append('isbn', book.isbn);
    bookFormData.append('title', book.title);
    bookFormData.append('author', book.author);
    bookFormData.append('image', book.image);

    this.dialogRef.close(bookFormData);

    // this.form.reset();
  }
}
