export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}
export const ShoppingListFormErrorMessages = [
    new ErrorMessage('due_date', 'required', 'Es muss ein Fälligkeitsdatum angegeben werden.'),
    new ErrorMessage('items', 'required', 'Es muss ein Artikel vollständig angegeben werden.'),
];
