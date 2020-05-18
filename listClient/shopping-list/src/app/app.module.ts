import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingListListComponent } from './shopping-list-list/shopping-list-list.component';
import { ShoppingListListItemComponent } from './shopping-list-list-item/shopping-list-list-item.component';
import { ShoppingListDetailsComponent } from './shopping-list-details/shopping-list-details.component';
import { ShoppingListCollectionService } from "./shared/shopping-list-collection.service";
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ShoppingListFormComponent } from './shopping-list-form/shopping-list-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UserShoppingListComponent } from './user-shopping-list/user-shopping-list.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./shared/auth.service";
import { TokenInterceptorService } from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import { ShoppingListCommentFormComponent } from './shopping-list-comment-form/shopping-list-comment-form.component';
import { ShoppingListBillingFormComponent } from './shopping-list-billing-form/shopping-list-billing-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListListComponent,
    ShoppingListListItemComponent,
    ShoppingListDetailsComponent,
    HomeComponent,
    ShoppingListFormComponent,
    UserShoppingListComponent,
    LoginComponent,
    ShoppingListCommentFormComponent,
    ShoppingListBillingFormComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [ShoppingListCollectionService, AuthService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptorService,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
