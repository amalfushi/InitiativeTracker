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
      providers : [CharacterDataService],
      // imports: [Character]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should show CHARACTER', () => {
  //   let c = new Character();
  //   c.name = 'TEST CHARACTER'
  //   component.character = c;

  //   expect(component.character)
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
