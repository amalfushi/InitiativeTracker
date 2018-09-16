import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';

import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Character } from '../character';

describe('Character List Component', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let testCharacter: Character;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterListComponent,
        CharacterCardComponent],
      imports: [FormsModule, DndModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testCharacter = new Character();
    testCharacter.name = "TEST CHARACTER";
    testCharacter.player_name = "TEST PLAYER";
    testCharacter.initiative = 12;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty character list', () => {
    expect(component.characters.length).toBe(0)
  })

  it('.addCharacter should do nothing', () => {
    component.addCharacter();
    expect(component.characters.length).toBe(0);
  })

  it('.addCharacter should add TEST CHARACTER', () => {
    component.newCharacter = testCharacter;
    component.addCharacter();
    expect(component.characters.length).toBe(1);
    expect(component.characters[0]).toBe(testCharacter);
  });

  it('.delteCharacter should remove TEST CHARACTER', () => {
    component.removeCharacter(testCharacter);
    expect(component.characters.length).toBe(0);
  });
});
