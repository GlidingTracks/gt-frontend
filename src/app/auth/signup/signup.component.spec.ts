import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ SignupComponent ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
