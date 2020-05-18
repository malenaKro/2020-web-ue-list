import { Component } from '@angular/core';
import { AuthService } from "./shared/auth.service";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  isLoggedIn() {
      return this.authService.isLoggedIn();
  }

  isLoggedOut() {
      return this.authService.isLoggedOut();
  }

  getLoginLabel(){
      if(this.isLoggedIn()){
          return "Logout";
      } else {
          return "Login";
      }
  }

  logout (){
      this.authService.logout();
  }
}
