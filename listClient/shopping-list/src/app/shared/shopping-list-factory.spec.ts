import { ShoppingListFactory } from './shopping-list-factory';

describe('ShoppingListFactory', () => {
  it('should create an instance', () => {
    expect(new ShoppingListFactory()).toBeTruthy();
  });
});
