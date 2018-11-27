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
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  newCharacter: Character = new Character();
  selectedSavedChar: Character = null;
  characters: Character[] = [];
  user: User = new User;

  constructor(private _characterService: CharacterDataService, private _userService: UserService) {
  }


  ngOnInit() {
    this.user = this.setUser();
    this.characters = this._characterService.getAllCharacters();
  }

  addNewCharacter(): Character {
    if (this.newCharacter.name !== "") {
      this._characterService.addCharacter(this.newCharacter);
      this.newCharacter = new Character();
    }
    return this.newCharacter;
  }
  addSavedCharacter(): Character {
    console.log(this.selectedSavedChar.name)
    if (this.selectedSavedChar != null) {
      Object.assign(this.newCharacter, this.selectedSavedChar);
      this._characterService.addCharacter(this.newCharacter);
      this.newCharacter = new Character;
      return this.newCharacter;
    }
  }

  removeCharacter(character): Character[] {
    this._characterService.deleteCharacterById(character);
    this.characters = this.getCharacters();
    return this.characters;
  }

  getCharacters(): Character[] {
    // if (!this.user.isDemo) {
    //   for (let char of this.user.saved_characters) {
    //     this._characterService.addCharacter(char);
    //   }
    // }
    return this._characterService.getAllCharacters();
  }

  sortCharacters(): Character[] {
    this.characters = this._characterService.sortCharacters();
    return this.characters;
  }

  onMove(character: Character, position: number): Character[] {
    this._characterService.moveCharacter(character, position);
    return this.characters;
  }

  setUser(): User {
    return this._userService.getUser();
  }


}
