import { TestBed } from '@angular/core/testing';

import { CampaignMsgService } from './campaign-msg.service';

describe('CampaignMsgService', () => {
  let service: CampaignMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
