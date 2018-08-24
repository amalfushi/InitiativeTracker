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
    // this.newCharacter.name ="barnaby";
    // this.newCharacter.player_name="jones";
    // this.newCharacter.initiative=10;
    // this.addCharacter();
    // this.tests.push(this.diceService.evaluate("ddddd6 + dddd4"));
    // this.tests.push(this.diceService.evaluate("d6+2d12-3"));
    // this.tests.push(this.diceService.evaluate("d6*(2d12-3)"));
    // this.tests.push(this.diceService.evaluate("d6*(2d12-3)/d4+2"));
    // this.tests.push(this.diceService.evaluate("(d6*(2d12-3)/d4+2)+2d3"));
    // console.log(this.tests)
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
