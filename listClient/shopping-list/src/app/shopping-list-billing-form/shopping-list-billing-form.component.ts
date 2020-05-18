import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingList} from "../shared/shopping-list";
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {ShoppingListBillingFormErrorMessages} from "./shopping-list-billing-form-error-messages";

@Component({
  selector: 'bs-shopping-list-billing-form',
  templateUrl: './shopping-list-billing-form.component.html',
  styles: []
})
export class ShoppingListBillingFormComponent implements OnInit {

  billingForm: FormGroup;
  //empty comment text
  final_sum: number = null;
  errors: { [key: string]: string } = {};
  user_id: number;
  id: number;
  legal_notice: '';
  //state for form
  formOn = false;
  list: ShoppingList;

  constructor(private fb: FormBuilder, private ss: ShoppingListCollectionService,
              private route: ActivatedRoute, private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    //form is seen on screen
    this.formOn = true;
    this.user_id = Number(this.authService.getCurrentUserId());
    this.id = this.route.snapshot.params['id'];

    this.ss.getSingle(this.id).subscribe(res => this.list = res);

    this.billingForm = this.fb.group({
      final_sum: new FormControl('', Validators.required),
      legal_notice: new FormControl('', Validators.required)
    });
  }

  submitForm() {
    //console.log(this.billingForm.value);

    if (this.billingForm.value.legal_notice == true){
      const billing = {
        'volunteer_id': this.user_id,
        'final_sum': this.billingForm.value.final_sum
      };

      //console.log(billing);

      this.ss.billing(this.id, billing).subscribe( res => {
        this.list = res;
        this.router.navigate(['../list', this.id]);
      });
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (const message of ShoppingListBillingFormErrorMessages) {
      const control = this.billingForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}