import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingList} from "../shared/shopping-list";
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-user-shopping-list',
  templateUrl: './user-shopping-list.component.html',
  styles: []
})
export class UserShoppingListComponent implements OnInit {

  lists: ShoppingList[];
  @Output() showDetailsEvent = new EventEmitter<ShoppingList>();

  constructor(
      private ss: ShoppingListCollectionService,
      public authService: AuthService ){}

  ngOnInit(): void {
    let user = {
      'user_id': this.authService.getCurrentUserId(),
      'role': this.authService.getCurrentUserRole()
    };
    this.ss.getUsersLists(user).subscribe(res => this.lists = res);
  }

}
