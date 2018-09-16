import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCardComponent } from './character-card.component';
import { FormsModule } from '@angular/forms';
import { CharacterDataService } from '../character-data.service';
import { DiceService } from '../dice.service';
import { Character } from '../character';

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;
  let testCharacter: Character;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterCardComponent],
      imports: [FormsModule],
      providers: [CharacterDataService, DiceService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    testCharacter = new Character();
    testCharacter.name = "TEST CHARACTER";
    // });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  // it('should display character name', () => {
  //   component.character = testCharacter;
  //   expect(component.character.name).toBe('TEST CHARACTER')
  // });
});