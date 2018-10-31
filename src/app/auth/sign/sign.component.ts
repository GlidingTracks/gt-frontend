import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  signForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              protected authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(signMethod) {
    const email = this.signForm.get('email').value;
    const password = this.signForm.get('password').value;

    signMethod(email, password)
    .then(() => this.router.navigate(['/map-view']),
          (error) => this.errorMessage = error
    );
  }
}
