import { Component, OnInit } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

import { Character } from '../character';
import { CharacterDataService } from '../character-data.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterDataService]
})
export class CharacterListComponent implements OnInit {
  newCharacter: Character = new Character();
  characters: Character[];

  constructor(private characterDataService: CharacterDataService) {
    this.characters = this.getCharacters();
  }

  ngOnInit() {
    // this.newCharacter.name ="barnaby";
    // this.newCharacter.player_name="jones";
    // this.newCharacter.initiative=10;
    // this.addCharacter();
  }

  addCharacter() {
    if (this.newCharacter.name !== "") {
      this.characterDataService.addCharacter(this.newCharacter);
      this.newCharacter = new Character();
    }
  }

  removeCharacter(character) {
    this.characterDataService.deleteCharacterById(character.id);
    this.characters = this.getCharacters();
  }

  getCharacters() {
    return this.characterDataService.getAllCharacters();
  }

  sortCharacters() {
    this.characters = this.characterDataService.sortCharacters();
  }

  onMove(character: Character, position: number) {
    this.characterDataService.moveCharacter(character, position);
  }
}
