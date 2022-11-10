import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(public router: Router, public auth: Auth) {}
  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) =>
      this.auth.onAuthStateChanged(
        (user) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(['auth','login']);
            return reject();
          }
        },
        (error) => reject(error)
      )
    );
  }
}
