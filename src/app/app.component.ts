import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCRUD';
  isLoggedIn: Observable<boolean>;

  constructor( private loginService: LoginService) {
  }
  
  ngOnInit() {
    //import loginService and call the current user
    //if there is a user, redirects them to the home page 
    this.loginService.getCurrentUser();

    this.isLoggedIn = this.loginService.isLoggedIn;
  }

  onLogout() {
    this.loginService.logout();
  }

}
