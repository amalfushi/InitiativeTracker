import { Roll } from "./roll";

export class Character {
    _id: number;
    name: string = "";
    player_name: string = "";
    initiative: number;
    // health: number;
    // defense: number;
    // new_roll: Roll = new Roll("");
    rolls: Roll[] = [];
    stats: Object = {};
    isCopy: boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
