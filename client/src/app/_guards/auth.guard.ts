import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {  

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) { }

  canActivate(): Observable<boolean> {
    // we're inside a guard so it subscribes to a currentUser automatically (see 6.68)
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user) return true;

        this.toastr.error('You shall not pass!');
      })
    )
  }
  
}
