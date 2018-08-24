import { Roll } from "./roll";

export class Character {
    id: number;
    name: string = "";
    player_name: string = "";
    initiative: number;
    health: number;
    defense: number;
    new_roll: Roll;
    rolls: Roll[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
