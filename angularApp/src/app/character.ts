export class Character {
    id: number;
    name: string = "";
    player_name: string = "";
    initiative: number;
    health: number;
    defense: number;
    new_roll: string = "3d6";
    rolls: string[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
