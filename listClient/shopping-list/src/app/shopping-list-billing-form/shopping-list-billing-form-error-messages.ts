export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}
export const ShoppingListBillingFormErrorMessages = [
    new ErrorMessage('final_sum', 'required', 'Es muss eine Endsumme angegeben werden.'),
    new ErrorMessage('legal_notice', 'required', 'Die Kenntnis über die Konsequenzen von Falschangaben muss bestätigt werden.'),
];
