import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //@Input() usersFromHomeComponent: any; // see 5.59 Parent to child communication
  @Output() cancelRegister = new EventEmitter(); // see 5.60 Child to parent communication
  
  //model: any = {};

  registerForm: FormGroup; // see '12.140 Reactive forms introduction' for details

  maxDate: Date; // see '12.147 Adding a reusable date input' for details
  
  validationErrors: string[] = []; // see '12.149 Client side registration' for details

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder, // see '12.145 Using the form builder service' for details
    private router: Router // see '12.149 Client side registration' for details
    ) { }

  ngOnInit(): void {
    this.initializeForm();

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // see '12.147 Adding a reusable date input' for details
  }

  // see '12.140 Reactive forms introduction' for details
  // see '12.141 Client side validation' for details
  // see '12.142 Adding custom validators' for details
  initializeForm() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
    // });

    // see '12.145 Using the form builder service' for details
    // see '12.146 Expanding the register form' for details
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    });
  }

  // see '12.142 Adding custom validators' for details
  matchValues(matchTo: string) : ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true }
    }
  }

  // see '12.140 Reactive forms introduction' for details
  // see '12.149 Client side registration' for details
  register() {
    //console.log(this.registerForm.value);

    this.accountService.register(this.registerForm.value).subscribe(response => {
      //console.log(response);
      
      this.router.navigateByUrl('/members');

      //this.cancel();
    }, error => {
      this.validationErrors = error;
      
      //console.log(error);
      //this.toastr.error(error.error);
    });
  }

  // register() {
  //   //console.log(this.model);

  //   this.accountService.register(this.model).subscribe(response => {
  //     //console.log(response);
      
  //     this.cancel();
  //   }, error => {
  //     console.log(error);
  //     this.toastr.error(error.error);
  //   });
  // }

  cancel() {
    //console.log("cancelled");
    this.cancelRegister.emit(false);
  }

}