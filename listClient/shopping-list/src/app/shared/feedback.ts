import {User} from "./user";

export class Feedback {
    constructor (
        public id: number,
        public user_id: number,
        public created_at: Date,
        public feedback_text: string
    ){}
}
