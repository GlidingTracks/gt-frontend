import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  @Input() formTitle: string;
  @Input() submitText: string;
  @Input() submitMethod: string;

  signForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signForm.get('email').value;
    const password = this.signForm.get('password').value;

    this.authService.userHandler(email, password, this.submitMethod)
      .then( () => this.router.navigate(['/map-view']) )
      .catch( error => {
        this.errorMessage = error;
        throw new Error(error);
      });
  }
}
