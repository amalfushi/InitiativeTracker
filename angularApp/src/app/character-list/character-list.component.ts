import { Component, OnInit } from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { MatExpansionModule } from '@angular/material';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  characters: Object[] = [
    {
      "name": "Barnaby",
      "type": "Player Character",
      "player_name": "Jones"
    }
  ];

  newCharacter: Object = {
    "name": "",
    "type": "",
    "player_name": ""
  }

  constructor() { }

  ngOnInit() {
  }

  addCharacter() {
    this.characters.push(this.newCharacter);
    this.newCharacter = new Object({
      "name": "",
      "type": "",
      "player_name": ""
    })
  }

  removeCharacter(character) {
    console.log(`${character.name} will be removed`);
  }

  onMove(character: Object, position: number){
    console.log(`Moved ${JSON.stringify(character)} to position ${position}`);
  }
}
