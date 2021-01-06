import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any; // we'll pass this users from our home component to it's child register component (see 5.59 Parent to child communication)

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(users => this.users = users)
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event; // the event will be false (we're emitting this from child register component) - see 5.60 Child to parent communication
  }
}
