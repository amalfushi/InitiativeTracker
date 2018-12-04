import { Injectable } from '@angular/core';
import { User } from './user';
import { Character } from './character';
import { Roll } from './roll';
import { CharacterDataService } from './character-data.service'

@Injectable()
export class UserService {

  user: User = null;

  constructor(private characterService: CharacterDataService) {
    // this.setTestUser();
  }

  setTestUser(): User {
    this.user = new User();
    this.user.username = 'amalfushi';
    this.user.character_settings = ["Hit Points", "Armor Class", "Spell TN"]

    let c1 = new Character();
    Object.assign(c1, {
      id: 1,
      name: "barnaby",
      player_name: "jones",
      initiative: 18,
      // health: 7,
      // defense: 14,
      stats: {
        "Hit Points": 22,
        "Armor Class": 16,
        "Spell TN": 18
      },
      rolls: [new Roll({ "3d4": "Sword" })]
    })


    let c2 = new Character();
    Object.assign(c2, {
      id: 2,
      name: "Dustin",
      player_name: "Schroeder",
      initiative: 12,
      // health: 30,
      // defense: 12,
      stats: {
        "Hit Points": 34,
        "Armor Class": 18,
      },
      rolls: [new Roll({ "2d10+7+2dd4": "Flaming Mace" })]
    })

    this.saveCharacter(c1);
    this.saveCharacter(c2);
    this.user.isDemo = false;
    return this.user;
  }

  getUser(): User {
    if (!this.user) this.user = new User();
    return this.user;
  }

  addSetting(setting: string): UserService {
    this.user.character_settings.push(setting);
    return this;
  }

  removeSetting(setting: string): UserService {
    this.user.character_settings = this.user.character_settings.filter((s) => s != setting);
    return this;
  }

  
  //////////////THIS BREAKS DICE ROLLS when adding a dice roll to a saved character without dice rolls
  saveCharacter(character: Character): Character {
    let found = this.user.saved_characters.findIndex((e)=> e.id === character.id);
    if (found < 0) {//add character (post)
      this.user.saved_characters.push(character);
      return character;
    } else {//update character (put)
      //Deep copy data
      let target = this.user.saved_characters[found]
      target.initiative = character.initiative;
      let newRolls = []
      for (let r of character.rolls) {
        const rToString = JSON.parse(JSON.stringify(r)); //lazy way to copy roll
        newRolls.push(new Roll(rToString));
      }
      target.rolls = newRolls;
      console.log(character, target)
      return target;
    }
  }
}
