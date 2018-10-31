import { Component, OnInit } from '@angular/core';
import { SignComponent } from '../sign/sign.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends SignComponent implements OnInit {

  onSignUp() {
    super.onSubmit(this.authService.createNewUser);
  }
}
