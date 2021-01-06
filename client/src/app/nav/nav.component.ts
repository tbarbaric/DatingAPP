import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  //currentUser$: Observable<User>;

  //loggedIn: boolean;

  // using 'public' here so we can use accountService in the .html
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser()

    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    //console.log(this.model);

    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      //this.loggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout() {
    this.accountService.logout();
    //this.loggedIn = false;
  }

  // See '5.56 Using the async pipe' for details why we don't need this method & loggedIn any more
  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user => {
  //     this.loggedIn = !!user; // !! return boolean based on what the user is (if user is null returns false)
  //   }, error => {
  //     console.log(error);
  //   });
  // }
}
