import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";

interface Response {
  response : string ;
  result : {
    token : string ;
  };
}

@Component ({
  selector : 'bs-login' ,
  templateUrl : './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm : FormGroup; //important for validation

  constructor (
      private fb: FormBuilder,
      private router: Router,
      private authenticationService: AuthService
  ) { }

  ngOnInit () {
    this . loginForm = this.fb.group ({
      username : [ '' , [Validators.required , Validators.email ]],
      password : [ '' , Validators.required ],
    });
  }

  login () {
    const val = this.loginForm.value;
    if ( val.username && val.password ) {
      this.authenticationService.login ( val.username , val.password ).subscribe (
          res =>
          {
            const resObj = res as Response;
            if ( resObj.response === "success" ) {
              this.authenticationService.setLocalStorage ( resObj.result.token );
              this.router.navigateByUrl( '/lists' );
            }
          });
    }
  }
  isLoggedIn (){
    return this.authenticationService.isLoggedIn ();
  }
}
