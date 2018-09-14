import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  isAuthSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
      (isAuth: boolean) => {
        this.isAuth = isAuth;
      }
    );
    this.authService.emitIsAuthSubject();
  }

  onSignOut() {
    this.authService.signOutUser();
    this.isAuth = this.authService.isAuth;
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe();
  }
}
