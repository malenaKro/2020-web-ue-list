import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShoppingList} from "../shared/shopping-list";
import {ShoppingListCollectionService} from "../shared/shopping-list-collection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShoppingListFactory} from "../shared/shopping-list-factory";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'bs-shopping-list-details',
  templateUrl: './shopping-list-details.component.html',
  styles: []
})
export class ShoppingListDetailsComponent implements OnInit {

  list: ShoppingList;
  user: any;

  constructor(
      private ss: ShoppingListCollectionService,
      private router: Router,
      private route: ActivatedRoute,
      public authService: AuthService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    //console.log(params['id']);
    this.ss.getSingle(params['id']).subscribe(l => {
      this.list = l;
      //console.log(this.list);
    });

    this.user = {
      'volunteer_id': Number(this.authService.getCurrentUserId())
    };
  }

  volunteerForList() {
    this.ss.volunteer(this.list, this.user).subscribe(res => this.list = res);
  }

  dropVolunteer() {
    this.ss.dropVolunteer(this.list, this.user).subscribe(res => this.list = res);
  }

  deleteShoppingList() {
    console.log(this.list);
    if (confirm('Liste wirklich löschen?')) {
      this.ss.delete(this.list.id)
          .subscribe(res => this.router.navigate(
              ['../../lists'], {relativeTo: this.route}));
    }
  }

  listChangedHandler(list: ShoppingList) {
    this.ss.getSingle(list.id).subscribe(l => {
      this.list = l;
      console.log(l);
    });
  }
}

