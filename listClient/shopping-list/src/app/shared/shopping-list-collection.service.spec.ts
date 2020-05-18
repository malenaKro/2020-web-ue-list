import { TestBed } from '@angular/core/testing';

import { ShoppingListCollectionService } from './shopping-list-collection.service';

describe('ShoppingListCollectionService', () => {
  let service: ShoppingListCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingListCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
