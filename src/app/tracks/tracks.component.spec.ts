import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import {Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const httpClientSpy = jasmine.createSpyObj('Router', ['get']);

@Component({ selector: 'app-single-track', template: ''})
class SingleTrackStubComponent {}

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TracksComponent,
        SingleTrackStubComponent
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
