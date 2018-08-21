import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardComponent } from './character-card.component';
import { CharacterDataService } from '../character-data.service';
import { Character } from '../character';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCardComponent ],
      providers : [CharacterDataService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let testCharacter = new Character();
    testCharacter.id = 1;
    testCharacter.initiative = 12;
    testCharacter.name = "TEST CHARACTER";
    testCharacter.player_name = "TEST PLAYER";
    
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = testCharacter;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
