import { Component } from '@angular/core';
import { LoginComponent } from '../../Component/login/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [LoginComponent],
})
export class LoginPageComponent {

//Function to verify user
  verifyUser() {

}


  onLoginClicked() {
  
  console.log("Login sucessfull!");


}
}
