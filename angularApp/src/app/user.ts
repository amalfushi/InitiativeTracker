import { Character } from "./character";

export class User {
    characters: Character[] = [];
    username: string = "";
    character_settings: string[];
    isDemo: boolean = true;
}
