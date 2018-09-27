import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MapViewComponent } from './map-view/map-view.component';
import { UploadComponent } from './upload/upload.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {MapViewService} from './services/map-view.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'map-view', canActivate: [AuthGuardService], component: MapViewComponent},
  { path: 'upload', canActivate: [AuthGuardService], component: UploadComponent},
  { path: '', redirectTo: 'map-view', pathMatch: 'full'},
  { path: '**', redirectTo: 'map-view'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    MapViewComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [],
  providers: [
    AuthService,
    AuthGuardService,
    MapViewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
