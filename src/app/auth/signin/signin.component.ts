import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignComponent } from '../sign/sign.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends SignComponent implements OnInit {

  constructor(private authService: AuthService,
              router: Router,
              formBuilder: FormBuilder) { super(router, formBuilder); }

  onSignIn() {
    super.onSubmit(this.authService.signInUser);
  }
}
