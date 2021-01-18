import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// see '7.81 Adding a server error page' for all details on this component

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) { 
    const navigation = this.router.getCurrentNavigation(); // this navigation state can only be get in the constructor

    this.error = navigation?.extras?.state?.error;
  }

  ngOnInit(): void {
  }

}
