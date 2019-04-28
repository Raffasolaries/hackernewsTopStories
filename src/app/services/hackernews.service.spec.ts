import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HackernewsService } from './hackernews.service';

describe('HackernewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [HackernewsService]
  }));

  it('should be created', inject([HackernewsService], (service: HackernewsService) => {
    // const service: HackernewsService = TestBed.get(HackernewsService);
    expect(service).toBeTruthy();
  }));
});
