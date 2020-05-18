import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";

import { ShoppingListDetailsComponent} from "./shopping-list-details/shopping-list-details.component";
import { ShoppingListListComponent } from "./shopping-list-list/shopping-list-list.component";
import { HomeComponent } from "./home/home.component";
import { ShoppingListFormComponent } from "./shopping-list-form/shopping-list-form.component";
import {UserShoppingListComponent} from "./user-shopping-list/user-shopping-list.component";
import {LoginComponent} from "./login/login.component";
import {ShoppingListBillingFormComponent} from "./shopping-list-billing-form/shopping-list-billing-form.component";

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'lists', component: ShoppingListListComponent},
    {path: 'list/:id', component: ShoppingListDetailsComponent},
    {path: 'newList', component: ShoppingListFormComponent},
    {path: 'editList/:id', component: ShoppingListFormComponent},
    {path: 'my-lists', component: UserShoppingListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'list/billing/:id', component: ShoppingListBillingFormComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule{ }