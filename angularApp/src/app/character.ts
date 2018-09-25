import { Roll } from "./roll";

export class Character {
    id: number;
    name: string = "";
    player_name: string = "";
    initiative: number;
    // health: number;
    // defense: number;
    new_roll: Roll = new Roll("");
    rolls: Roll[] = [];
    stats: Object = {};

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
