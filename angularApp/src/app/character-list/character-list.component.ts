import { Component, OnInit } from '@angular/core';
import { Character } from '../character';
import { CharacterDataService } from '../character-data.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { Roll } from '../roll';

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
  cur_turn: number = 0;

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
    this.getCharacters();
    return this.newCharacter;
  }
<<<<<<< HEAD

  addSavedCharacter(): Character {
=======
  addSavedCharacter(): Character{
>>>>>>> parent of 91ba9d8... +Add Character Copies to User Saved Characters as New Character
    if (this.selectedSavedChar != null) {
      //Create a deep copy of the Character Object
      this.newCharacter = new Character(this.selectedSavedChar);
      this.newCharacter.rolls = []
      for (let r of this.selectedSavedChar.rolls) {
        this.newCharacter.rolls.push(new Roll(JSON.parse(JSON.stringify(r))));
      }
      this.newCharacter.isCopy = true;
      this.addNewCharacter();
      return this.newCharacter;
    }
  }

  removeCharacter(character): Character[] {
    this._characterService.deleteCharacterById(character);
    this.characters = this.getCharacters();
    return this.characters;
  }

  getCharacters(): Character[] {
    return this._characterService.getAllCharacters();
  }

  sortCharacters(): Character[] {
    this.characters = this._characterService.sortCharacters();
    return this.characters;
  }

  onMove(character: Character, position: number): Character[] {
    // this._characterService.moveCharacter(character, position);
    return this.characters;
  }

  setUser(): User {
    return this._userService.getUser();
  }

  nextTurn(): number {
    this.cur_turn++;
    if (this.cur_turn >= this.characters.length) this.cur_turn = 0;
    return this.cur_turn;
  }

  prevTurn(): number {
    this.cur_turn--;
    if (this.cur_turn < 0) this.cur_turn = this.characters.length - 1;
    return this.cur_turn;
  }
}
