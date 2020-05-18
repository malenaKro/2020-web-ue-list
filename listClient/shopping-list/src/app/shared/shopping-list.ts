import {User} from "./user";
export {User} from "./user";
import {Item} from "./item";
export {Item} from "./item";
import {Feedback} from "./feedback";
export {Feedback} from "./feedback";

export class ShoppingList {
    constructor(
        public id: number,
        public created_at: Date,
        public due_date: Date,
        public creator_id: number,
        public items: Item[],
        public final_sum?: number,
        public volunteer_id?: number,
        public feedbacks?: Feedback[],
        public creator?: User,
        public volunteer?: User
    ){}
}
