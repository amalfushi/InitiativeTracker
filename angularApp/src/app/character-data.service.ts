import { Injectable } from '@angular/core';
import { Character } from './character';

@Injectable()
export class CharacterDataService {
  lastId: number = 0;
  characters: Character[] = [];

  constructor() { }

  addCharacter(character: Character): CharacterDataService {
    if (character.name !== "")
      if (!character.id) {
        character.id = this.lastId++;
      }
      if (!character.initiative) character.initiative = 0;
    this.characters.push(character);
    if (character.initiative >= 0) this.sortCharacters();
    return this;
  }

  deleteCharacterById(id: number): CharacterDataService {
    this.characters = this.characters.filter(todo => todo.id !== id);
    return this;
  }

  getCharacterById(id: number): Character {
    return this.characters.filter(todo => todo.id === id).pop();
  }

  updateTodoById(id: number, values: Object = {}): Character {
    let character = this.getCharacterById(id);
    if (!character) return null;
    Object.assign(character, values);
    return character;
  }

  getAllCharacters(): Character[] {
    return this.characters;
  }

  moveCharacter(character: Character, position: number): void {
    // console.log(`Moved ${JSON.stringify(character)} to the position ${position}`)
  }

  sortCharacters() {
    this.characters = this.characters.sort((a, b) => b.initiative - a.initiative);
    return this.characters;
  }
}
