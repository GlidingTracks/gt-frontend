import { Component, OnInit, Injectable } from '@angular/core';
import { SignComponent } from '../sign/sign.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends SignComponent {

  onSignIn() {
    super.onSubmit(this.authService.signInUser);
  }
}
