import { Character } from "./character";

export class User {
    _id: number;
    username: string = "";
    character_settings: string[] = ["Health", "Defense"];
    saved_characters: Character[] = [];
    isDemo: boolean = true;
}
