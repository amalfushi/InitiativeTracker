import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../character';
import { DiceService } from '../dice.service';
import { Roll } from '../roll';
import { User } from '../user';
import { UserService } from '../user.service';
import { CharacterDataService } from '../character-data.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css'],
})

export class CharacterCardComponent implements OnInit {
  @Input() character: Character;
  @Input() nameMod: number;
  @Output() toDelete = new EventEmitter();

  user: User = new User();

  constructor(private diceService: DiceService, private userService: UserService, private characterService: CharacterDataService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  deleteCharacter(): void {
    this.toDelete.emit(this.character);
  }

  addRoll(): void {
    //Normalize the new dice roll
    let roll = this.character.new_roll;
    roll.dice_string = roll.dice_string.trim().toLowerCase();

    //Validate dice string
    if (this.diceService.validateDiceString(roll.dice_string)) {
      roll.dice_string = roll.dice_string.replace(/[d]+/g, 'd'); ///Remove any repeated 'd' otherwise they end up as 1d1
      this.character.rolls.push(roll);
      //Reset this characters new roll
      this.character.new_roll = new Roll('');
    }
    //TODO: add Invalid Dice String Warning
  }

  rollDice(roll): void {
    this.diceService.evaluateRoll(roll);
  }

  removeRoll(roll): void {
    let rolls = this.character.rolls;
    this.character.rolls = rolls.filter((r) => r != roll);
  }

  updateCharacter(): void {
    this.userService.saveCharacter(this.character);
  }

  saveToNewCharacter(): void {
    this.userService.copyCharacterToSaved(this.character);
  }

  objectKeys(obj): string[] {
    return Object.keys(obj);
  }
}
