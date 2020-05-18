import {Component, Input, OnInit} from '@angular/core';
import {ShoppingList} from "../shared/shopping-list";

@Component({
  selector: 'a.bs-shopping-list-list-item',
  templateUrl: './shopping-list-list-item.component.html',
  styles: []
})
export class ShoppingListListItemComponent implements OnInit {
  @Input() list: ShoppingList
  constructor() { }

  ngOnInit(): void {
    //console.log(this.list);
  }

}
