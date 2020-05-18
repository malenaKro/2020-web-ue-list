import {ShoppingList} from "./shopping-list";
import {Address} from "./address";

export class ShoppingListFactory {

    static empty(): ShoppingList{
        //id, created_at, due_date, creator(User), items[], final_sum, volunteer(User), feedbacks(Feedback)
        return new ShoppingList (
            null,
            new Date(),
            new Date(),
            0,
            [
                {
                    id: 0,
                    name: '',
                    amount: '',
                    max_price: ''
                }
            ],
            0,
            null,
            [],
            null,
            null
        );
    }

    static fromObject(rawShoppingList: any): ShoppingList {
        return new ShoppingList(
            rawShoppingList.id,
            typeof (rawShoppingList.created_at) === 'string' ?
                new Date (rawShoppingList.created_at) : rawShoppingList.created_at,
            typeof (rawShoppingList.due_date) === 'string' ?
                new Date (rawShoppingList.due_date) : rawShoppingList.due_date,
            rawShoppingList.creator_id,
            rawShoppingList.items,
            rawShoppingList.final_sum,
            rawShoppingList.volunteer_id,
            rawShoppingList.feedbacks,
            rawShoppingList.creator,
            rawShoppingList.volunteer
        );
    }

}
