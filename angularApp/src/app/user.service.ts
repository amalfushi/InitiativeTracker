import { Injectable } from '@angular/core';
import { User } from './user';
import { Character } from './character';
import { Roll } from './roll';

@Injectable()
export class UserService {

  user: User;

  constructor() {
    this.user = new User();
  }

  setTestUser(): User {
    this.user = new User();
    this.user.username = 'amalfushi';
    this.user.character_settings = ["HP", "AC", "Spell Save DC"]

    let c1 = new Character();
    Object.assign(c1, {
      name: "barnaby",
      player_name: "jones",
      initiative: 18,
      health: 7,
      defense: 14,
      rolls: [new Roll("3d4", "Sword")]
    })
    

    let c2 = new Character();
    Object.assign(c2, {
      name: "Dustin",
      player_name: "Schroeder",
      initiative: 12,
      health: 30,
      defense: 12,
      rolls: [new Roll("2d10+7+2dd4", "Flaming Mace")]
    })

    this.user.characters = [c1, c2]
    this.user.isDemo = false;
    return this.user;
  }

  getUser(): User {
    return this.user;
  }
}
