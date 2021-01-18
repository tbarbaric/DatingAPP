import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public accountService: AccountService, // using 'public' here so we can use accountService in the .html
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //this.getCurrentUser()

    //this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    //console.log(this.model);

    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
      
      //console.log(response);
      //this.loggedIn = true;
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');

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
