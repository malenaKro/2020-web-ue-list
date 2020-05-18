import { FormControl, FormArray } from '@angular/forms';

export class ShoppingListValidators {
    static atLeastOneItem(controlArray: FormArray): {[error: string]: any} {
        console.log(controlArray);
        const check = controlArray.controls.some(el => el.value ? true :
            false);
        return check ? null : {atLeastOneItem: {valid: false}};
    }
}
