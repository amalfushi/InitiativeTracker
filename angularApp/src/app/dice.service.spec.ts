import { TestBed, inject } from '@angular/core/testing';

import { DiceService } from './dice.service';

describe('Dice Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiceService]
    });
  });

  it('should be created', inject([DiceService], (service: DiceService) => {
    expect(service).toBeTruthy();
  }));
});
