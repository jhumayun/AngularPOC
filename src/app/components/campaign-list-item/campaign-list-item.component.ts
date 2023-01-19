import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from '../../DataModels/Campaign';

@Component({
  selector: '[app-campaign-list-item]',
  templateUrl: './campaign-list-item.component.html',
  styleUrls: ['./campaign-list-item.component.css']
})
export class CampaignListItemComponent {
  @Input() campaign!: Campaign;
  @Input() serialNo!: Number;
  @Output() onDeleteCampaign: EventEmitter<Campaign> = new EventEmitter();

  deleteCampaign(campaign: Campaign){
    this.onDeleteCampaign.emit(campaign);
  }
}
