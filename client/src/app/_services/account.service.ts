import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

/* 
  1. Injectable means that service can be injected into other components or other services
  2. Angular service is a singleton (see '5.50 Introduction to Angular services')
*/
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  //baseUrl = 'https://localhost:5001/api/';
  baseUrl = environment.apiUrl; // see '9.102 Adding a member service' (get rid of hard-coded strings)

    // See '5.55 Persisting the login' for details
    private currentUserSource = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSource.asObservable(); // $ at the end: convention for observables

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));

          this.currentUserSource.next(user);

          //return user; (see 5.61 for why we could use it)
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');

    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }
}
