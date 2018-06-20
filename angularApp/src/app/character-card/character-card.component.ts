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
}
