import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CharacterDataService } from '../character-data.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  user: User = new User();
  newSetting: String = "";

  constructor(private _userService: UserService, private _characterService: CharacterDataService) { 
  }
  
  ngOnInit() {
    this.setUser()
  }

  setUser(){
    this.user = this._userService.getUser();
  }

  addSetting() {
    if (this.newSetting.match(/[a-zA-Z0-9]/)){
      this._userService.addSetting(this.newSetting.trim());
      this.newSetting = "";
    }
  }

  removeSetting(setting: string) {
    this._userService.removeSetting(setting);
  }

  objectKeys(obj): string[] {
    return Object.keys(obj);
  }
}
