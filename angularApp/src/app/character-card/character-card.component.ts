import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})
export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Output() toDelete = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  deleteCharacter() {
    this.toDelete.emit(this.character);
  }

  addRoll() {
    //Normalize the new dice roll
    this.character.new_roll = this.character.new_roll.toLowerCase();
    console.log(this.character.new_roll.match(/(\d*)([dD]\d*)((?:[+*-](?:\d+|\([d]*\)))*)(?:\+([dD]\d*))?/))
    if(this.character.new_roll.match(/(\d*)([dD]\d*)((?:[+*-](?:\d+|\([d]*\)))*)(?:\+([dD]\d*))?/)){ //Match any vaguelly valid dice roll
      if (!this.character.new_roll.match(/[a-ce-zA-CE-Z]/)) { //Do not match other letters
        this.character.rolls.push(this.character.new_roll);
        this.character.new_roll = "";
      }
    }
  }
}
