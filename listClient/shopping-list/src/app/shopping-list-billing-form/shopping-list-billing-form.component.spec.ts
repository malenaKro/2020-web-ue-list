import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListBillingFormComponent } from './shopping-list-billing-form.component';

describe('ShoppingListBillingFormComponent', () => {
  let component: ShoppingListBillingFormComponent;
  let fixture: ComponentFixture<ShoppingListBillingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListBillingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListBillingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
