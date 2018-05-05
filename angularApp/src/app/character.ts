export class Character {
    id: number;
    name: string = "";
    player_name: string = "";
    initiative: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
