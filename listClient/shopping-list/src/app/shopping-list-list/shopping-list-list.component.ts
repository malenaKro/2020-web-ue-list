import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ShoppingList} from '../shared/shopping-list';
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-shopping-list-list',
  templateUrl: './shopping-list-list.component.html',
  styles: []
})
export class ShoppingListListComponent implements OnInit {

  lists: ShoppingList[];
  //@Output() showDetailsEvent = new EventEmitter<ShoppingList>();

  constructor(
      private ss: ShoppingListCollectionService,
      public authService: AuthService
  ){}

  ngOnInit(): void {
    this.ss.getAll().subscribe(res => this.lists = res);
  }

}
