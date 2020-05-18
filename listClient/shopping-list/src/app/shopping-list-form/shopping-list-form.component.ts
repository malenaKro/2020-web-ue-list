import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShoppingListFactory} from "../shared/shopping-list-factory";
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Feedback, Item, ShoppingList, User} from "../shared/shopping-list";
import {ShoppingListFormErrorMessages} from "./shopping-list-form-error-messages";
import {ShoppingListValidators} from "../shared/shopping-list-validators";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-shopping-list-form',
  templateUrl: './shopping-list-form.component.html',
  styles: []
})
export class ShoppingListFormComponent implements OnInit {

  shoppingListForm: FormGroup;
  list = ShoppingListFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingList = false;
  items: FormArray;

  constructor(private fb: FormBuilder, private ss: ShoppingListCollectionService,
              private route: ActivatedRoute, private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
      const user_id = this.authService.getCurrentUserId();
      const id = this.route.snapshot.params['id'];

      if (id) {
          this.isUpdatingList = true;
          this.ss.getSingle(id).subscribe(list => {
              this.list = list;
              this.initList();
          });
      }
      this.initList();
  }

  initList() {
      this.buildItemsArray();
      this.shoppingListForm = this.fb.group({
          id: this.list.id,
          created_at: this.list.created_at,
          due_date: [this.list.due_date, Validators.required],
          //get the value from logged in user!!!
          creator_id: this.list.creator_id,
          items: this.items,
          volunteer_id: this.list.volunteer_id,
          feedbacks: this.list.feedbacks,
          creator: this.list.creator,
          volunteer: this.list.volunteer
      });
      this.shoppingListForm.statusChanges.subscribe(() =>
          this.updateErrorMessages());
  }

  buildItemsArray() {

      if(this.list.items.length == 0){
        this.list.items.push(new Item(0, '', '', ''));
      }
      this.items = this.fb.array(
          this.list.items.map(
              i => this.fb.group ({
                id: new FormControl(i.id),//this.fb.control(i.id),
                name: new FormControl(i.name, [Validators.required]),//this.fb.control(i.name),
                amount: new FormControl(i.amount, [Validators.required, Validators.min(1)]),//this.fb.control(i.amount),
                max_price: new FormControl(i.max_price, [Validators.required, Validators.min(0.01)])//this.fb.control(i.max_price)
              })
          )
      );
  }

  addItemControl() {
    this.items.push(this.fb.group({ name: null, amount: null, max_price: null }));
  }

  submitForm() {
      // filter empty values
      this.shoppingListForm.value.items =
          this.shoppingListForm.value.items.filter(item => item.name);

      const list: ShoppingList = ShoppingListFactory.fromObject(this.shoppingListForm.value);

      console.log(list);

      //deep copy - did not work without??
      list.items = this.shoppingListForm.value.items;

      if (this.isUpdatingList) {
          this.ss.update(list).subscribe(res => {
              this.router.navigate(['../../list', list.id], { relativeTo: this.route });
          });
      } else {
          //insert the id of the current user!
          list.creator_id = this.authService.getCurrentUserId();
          //console.log(list);
          this.ss.create(list).subscribe(res => {
              this.list = ShoppingListFactory.empty();
              this.shoppingListForm.reset(ShoppingListFactory.empty());
              this.router.navigate(['../lists'], { relativeTo: this.route });
          });
      }
    }

  updateErrorMessages() {
    this.errors = {};
    for (const message of ShoppingListFormErrorMessages) {
      const control = this.shoppingListForm.get(message.forControl);
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
