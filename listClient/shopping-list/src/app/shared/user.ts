import {Address} from './address';
export {Address} from './address';

export class User {
    constructor(
        public id: number,
        public role: number,
        public firstname: string,
        public lastname: string,
        public addresses: Address[]
    ){}
}
