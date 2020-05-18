import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListCommentFormComponent } from './shopping-list-comment-form.component';

describe('ShoppingListCommentFormComponent', () => {
  let component: ShoppingListCommentFormComponent;
  let fixture: ComponentFixture<ShoppingListCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
