import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authorize();
  }

  
  private authorize(): Observable<boolean> {
    return this.auth.checkLoginStatus().pipe(

      map((isLoggedIn: boolean) => {

        if (!isLoggedIn) {
         
          this.router.navigate(['/login']);
          return false; 
        } else {
          return true;  
        }
      }),
      catchError((error) => {
        this.router.navigate(['/login']);  
        return of(false);  
      })
    );
  }
}
