import { Component, OnInit } from '@angular/core';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: [
    '.logo-title { text-align: center; color: lightgrey; margin-top: 10px;}'
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
