import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListListItemComponent } from './shopping-list-list-item.component';

describe('ShoppingListListItemComponent', () => {
  let component: ShoppingListListItemComponent;
  let fixture: ComponentFixture<ShoppingListListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
