import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  isAuthSubscription;

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        this.isAuthSubscription = this.authService.isAuthSubject.subscribe(
          (isAuth: boolean) => {
            if (isAuth) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
        this.authService.emitIsAuthSubject();
      }
    );
  }
}
