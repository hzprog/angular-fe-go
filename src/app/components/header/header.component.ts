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
  @Input() choiceOfToggle: 'update' | 'add';

  show: boolean;
  subscription: Subscription;
  userConnected: string = '';
  faSignOOutAlt = faSignOutAlt;

  constructor(
    private uiService: UiService,
    private authGuard: AuthguardServiceService
  ) {
    if (this.choiceOfToggle === 'add')
      this.subscription = this.uiService
        .onToggleAdd()
        .subscribe((value) => (this.show = value));
    else if (this.choiceOfToggle === 'update')
      this.subscription = this.uiService
        .onToggleUpdate()
        .subscribe((value) => (this.show = value));
  }

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let decodedToken: any = jwt_decode(token);
    this.userConnected = decodedToken.client;
  }

  toggle() {
    if (this.choiceOfToggle === 'add') {
      this.uiService.toggleAddTask();
      this.show = !this.show;
    } else {
      this.uiService.toggleUpdateTask();
      this.show = !this.show;
    }
  }

  signOut() {
    this.authGuard.signOut();
  }
}
