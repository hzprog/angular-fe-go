import { Component, OnInit, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthguardServiceService } from 'src/app/services/authguard-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = 'List of books';
  @Input() textOfButton: string = 'Add book';
  showAddBook: boolean;
  subscription: Subscription;
  userConnected: string = '';
  faSignOOutAlt = faSignOutAlt;

  constructor(
    private uiService: UiService,
    private authGuard: AuthguardServiceService
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddBook = value));
  }

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let decodedToken: any = jwt_decode(token);
    this.userConnected = decodedToken.client;
  }

  toggle() {
    this.uiService.toggleAddTask();
  }

  signOut() {
    this.authGuard.signOut();
  }
}
