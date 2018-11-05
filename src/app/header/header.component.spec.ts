import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import * as firebase from 'firebase';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('firebase app should be initialized', () => {
    expect(firebase.app.length).toBeGreaterThan(0);
  });

  it('no user should be authenticated after onSignOut()', () => {
    component.onSignOut();
    expect(component.isAuth).toBeFalsy();
  });
});
