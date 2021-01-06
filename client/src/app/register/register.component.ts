import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromHomeComponent: any; // see 5.59 Parent to child communication
  @Output() cancelRegister = new EventEmitter(); // see 5.60 Child to parent communication
  
  model: any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  register() {
    //console.log(this.model);

    this.accountService.register(this.model).subscribe(response => {
      //console.log(response);
      
      this.cancel();
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    //console.log("cancelled");
    this.cancelRegister.emit(false);
  }

}