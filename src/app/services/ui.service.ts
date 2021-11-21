import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddBook: boolean = false;
  private showUpdateBook: boolean = false;

  private subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddBook = !this.showAddBook;
    this.subject.next(this.showAddBook);
  }
  toggleUpdateTask(): void {
    this.showUpdateBook = !this.showUpdateBook;
    this.subject.next(this.showUpdateBook);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
