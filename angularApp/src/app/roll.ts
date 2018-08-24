export class Roll {
    name: string = "";
    dice_string: string = "";
    last_rolls: string = "";
    total: number = null;

    constructor(roll: string) {
        this.dice_string = roll;
    }
}
