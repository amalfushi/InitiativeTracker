import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CharacterDataService } from '../character-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[UserService, CharacterDataService]
})
export class SettingsComponent implements OnInit {

  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.setTestUser();
    this.getUser()
  }

  getUser(){
    this.user = this.userService.getUser();
  }

}
