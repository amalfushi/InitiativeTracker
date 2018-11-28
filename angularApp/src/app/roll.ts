export class Roll {
    name: string;
    dice_string: string = "";
    last_rolls: string = "";
    total: number = null;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
