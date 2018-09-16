import { Component, OnInit } from '@angular/core';
// import { DndModule } from 'ng2-dnd';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatCardModule } from '@angular/material/card';

import { Character } from '../character';
import { CharacterDataService } from '../character-data.service';
import { DiceService } from '../dice.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  providers: [CharacterDataService, DiceService, UserService]
})
export class CharacterListComponent implements OnInit {
  newCharacter: Character;
  characters: Character[];
  tests: Object[];
  user: User;

  constructor(private characterDataService: CharacterDataService, private userService: UserService) {
    this.newCharacter = new Character();
  }


  ngOnInit() {

    this.user = this.userService.setTestUser();
    this.characterDataService.addUserCharacter(this.user.characters[0]);
    this.characterDataService.addUserCharacter(this.user.characters[1]);
    this.characters = this.characterDataService.getAllCharacters();
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
    if (this.user.isDemo){
      for (let char of this.user.characters) {
        this.characterDataService.addCharacter(char);
      }
    }
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
