import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';
import { FormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Character } from '../character';

describe('Character List Component', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterListComponent,
      CharacterCardComponent ],
      imports: [FormsModule, DndModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty character list', ()=> {
    expect(component.characters.length).toBe(0)
  })

  it('.addCharacter should do nothing', ()=> {
    component.addNewCharacter();
    expect(component.characters.length).toBe(0);
  })

  it('.addCharacter should add TEST CHARACTER', ()=> {
    let testCharacter = new Character();
    testCharacter.name = "TEST CHARACTER";
    testCharacter.player_name = "TEST PLAYER";
    testCharacter.initiative = 12;

    component.newCharacter = testCharacter;
    component.addNewCharacter();
    expect(component.characters[0]).toBe(testCharacter);
  })

});
