import { Component, OnInit, Input } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ActivationEnd,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { filter, Observable } from 'rxjs';
import { Book } from 'src/app/Book';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  id: any;
  hz: string = 'houari';
  book: Book;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private route: ActivatedRouteSnapshot
  ) {}

  ngOnInit(): void {}
}
