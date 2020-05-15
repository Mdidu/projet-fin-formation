import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

// used to inject a service into other service
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.currentUser) {
    // if (localStorage) {
    // if (localStorage.getItem('currentUser') !== '' && localStorage.getItem('currentUser') !== null) {
      console.log(localStorage.getItem('currentUser'));
      console.log(localStorage);
      return true;
    } else {
      this.router.navigate(['auth/signin']);
    }
  }
}
