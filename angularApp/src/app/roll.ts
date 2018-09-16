export class Roll {
    name: string;
    dice_string: string = "";
    last_rolls: string = "";
    total: number = null;

    constructor(roll: string, name: string = "") {
        this.dice_string = roll;
        this.name = name;
    }
}
