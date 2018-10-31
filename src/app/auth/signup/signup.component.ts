import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignComponent } from '../sign/sign.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends SignComponent implements OnInit {

  constructor(private authService: AuthService,
              router: Router,
              formBuilder: FormBuilder) { super(router, formBuilder); }

  onSignUp() {
    super.onSubmit(this.authService.createNewUser);
  }
}
