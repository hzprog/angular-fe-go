import { Injectable } from '@angular/core';
import { Observable, observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showAddBook: boolean = false;
  private showUpdateBook: boolean = false;

  // private subject = new Subject<any>();
  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddBook = !this.showAddBook;
    this.subject1.next(this.showAddBook);
  }

  toggleUpdateTask(): void {
    this.showUpdateBook = !this.showUpdateBook;
    this.subject2.next(this.showUpdateBook);
  }

  // onToggle(): Observable<any> {
  //   return this.subject.asObservable();
  // }

  onToggleAdd(): Observable<any> {
    return this.subject1.asObservable();
  }

  onToggleUpdate(): Observable<any> {
    return this.subject2.asObservable();
  }
}
