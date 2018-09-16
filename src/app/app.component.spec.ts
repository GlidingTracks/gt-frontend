import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {Component, NO_ERRORS_SCHEMA} from "@angular/core";

@Component({ selector: 'app-header', template: ''})
class HeaderStubComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

