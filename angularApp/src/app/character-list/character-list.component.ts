import { Component, OnInit } from '@angular/core';
// import { DndModule } from 'ng2-dnd';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatCardModule } from '@angular/material/card';

import { Character } from '../character';
import { CharacterDataService } from '../character-data.service';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterDataService, DiceService]
})
export class CharacterListComponent implements OnInit {
  newCharacter: Character;
  characters: Character[];
  tests: Object[];

  constructor(private characterDataService: CharacterDataService) {
    this.newCharacter = new Character();
    // this.tests = [];
    this.characters = this.getCharacters();
  }


  ngOnInit() {
    this.newCharacter.name ="barnaby";
    this.newCharacter.player_name="jones";
    this.newCharacter.initiative=18;
    this.newCharacter.health = 7;
    this.newCharacter.defense = 14;
    this.addCharacter();
    this.newCharacter.name ="Dustin";
    this.newCharacter.player_name="Schroeder";
    this.newCharacter.initiative=12;
    this.newCharacter.health = 30;
    this.newCharacter.defense = 12;
    // this.newCharacter.
    this.addCharacter();
  }

  addCharacter(): Character {
    if (this.newCharacter.name !== "") {
      this.characterDataService.addCharacter(this.newCharacter);
      this.newCharacter = new Character();
    }
    return this.newCharacter;
  }

  removeCharacter(character): Character[] {
    this.characterDataService.deleteCharacterById(character.id);
    this.characters = this.getCharacters();
    return this.characters;
  }

  getCharacters(): Character[] {
    return this.characterDataService.getAllCharacters();
  }

  sortCharacters(): Character[] {
    this.characters = this.characterDataService.sortCharacters();
    return this.characters;
  }

  onMove(character: Character, position: number): Character[] {
    this.characterDataService.moveCharacter(character, position);
    return this.characters;
  }
}
