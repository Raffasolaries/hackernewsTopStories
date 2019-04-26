import { TestBed } from '@angular/core/testing';

import { HackernewsService } from './hackernews.service';

describe('HackernewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HackernewsService = TestBed.get(HackernewsService);
    expect(service).toBeTruthy();
  });
});
