import { Injectable } from '@angular/core';
import { User } from './user';
import { Character } from './character';
import { Roll } from './roll';
import { CharacterDataService } from './character-data.service'

@Injectable()
export class UserService {

  user: User = null;

  constructor(private characterService: CharacterDataService) {
  }

  setTestUser(): User {
    this.user = new User();
    this.user.username = 'amalfushi';
    this.user.character_settings = ["Hit Points", "Armor Class", "Spell TN"]

    let c1 = new Character();
    Object.assign(c1, {
      name: "barnaby",
      player_name: "jones",
      initiative: 18,
      health: 7,
      defense: 14,
      stats: {
        "Hit Points": 22,
        "Armor Class": 16,
        "Spell TN": 18
      },
      rolls: [new Roll("3d4", "Sword")]
    })


    let c2 = new Character();
    Object.assign(c2, {
      name: "Dustin",
      player_name: "Schroeder",
      initiative: 12,
      health: 30,
      defense: 12, stats: {
        "Hit Points": 34,
        "Armor Class": 18,
      },
      rolls: [new Roll("2d10+7+2dd4", "Flaming Mace")]
    })

    this.user.characters = [c1, c2]
    this.characterService.addCharacter(c1);
    this.characterService.addCharacter(c2);
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
}
