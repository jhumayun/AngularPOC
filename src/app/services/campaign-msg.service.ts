import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Campaign } from '../DataModels/Campaign';

export enum CampaignOpMode {
  add = 0,
  update = 1
}

@Injectable({
  providedIn: 'root'
})
export class CampaignMsgService {

  private campaignOpModeSubject =  new Subject<CampaignOpMode>();
  private campaignSubject= new Subject<Campaign>();

  public getCampaignOp = this.campaignOpModeSubject.asObservable();
  public getCampaign = this.campaignSubject.asObservable();

  constructor() { 
  }

  public setCampaign(campaign: Campaign) {
    this.campaignSubject.next(campaign);
  }

  public setCampaignOp(campaignOp: CampaignOpMode) {
    this.campaignOpModeSubject.next(campaignOp);
  }
}
