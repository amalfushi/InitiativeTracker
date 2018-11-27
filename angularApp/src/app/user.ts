import { Character } from "./character";

export class User {
    character_settings: string[] = ["Health", "Defense"];
    saved_characters: Character[] = [];
    username: string = "";
    isDemo: boolean = true;
}
