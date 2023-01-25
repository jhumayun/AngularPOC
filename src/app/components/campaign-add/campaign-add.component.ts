import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campaign } from '../../DataModels/Campaign';
import { CampaignMsgService, CampaignOpMode} from '../../services/campaign-msg.service';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})

export class CampaignAddComponent implements OnInit {
  @Output() onAddCampaign: EventEmitter<Campaign> = new EventEmitter();
  @Output() onEditCampaign: EventEmitter<Campaign> = new EventEmitter();
  today: Date = new Date();
  isOpen: boolean = false;
  model!: Campaign;
  mode!: CampaignOpMode;
  datesError: string = "";

  constructor(private campaignMsgSvc: CampaignMsgService){
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
  }

  ngOnInit(): void {
    this.campaignMsgSvc.getCampaign.subscribe((c) => this.model = c);
    this.campaignMsgSvc.getCampaignOp.subscribe((op) => {
      this.mode = op;
      if(this.mode == CampaignOpMode.update){
        this.isOpen = true;
      }
    });
    this.setFormDataAndMode(new Campaign("", this.today, this.today), CampaignOpMode.add);
  }

  toggleForm(){
    if(this.isOpen){
      this.isOpen = false;
    }
    else{
      this.isOpen = true;
    }
  }

  AddCampaignClicked(){
    this.setFormDataAndMode(new Campaign("", this.today, this.today), CampaignOpMode.add);
    this.toggleForm();
  }

  setFormDataAndMode(campaign: Campaign, mode: CampaignOpMode){
    this.campaignMsgSvc.setCampaign(campaign);
    this.campaignMsgSvc.setCampaignOp(mode);
  }

  isEditMode(){
    return this.mode == CampaignOpMode.update;
  }

  isAddMode(){
    return this.mode == CampaignOpMode.add;
  }

  onSubmit($event: Event, form: NgForm) { 
    $event.preventDefault();
    if(this.isAddMode()){
      this.model.id = new Date().getTime();
      this.onAddCampaign.emit(this.model);
    }
    else if(this.isEditMode()){
      this.onEditCampaign.emit(this.model);
    }

    this.toggleForm();
  }

  areDatesValid() {
    
    let isValid: boolean = false;
    let endDate: Date;
    let startDate: Date;
    if(!(this.model.endDate instanceof Date)){
      endDate = new Date(this.model.endDate);
    }
    else{
      endDate = this.model.endDate;
    }
    if(!(this.model.startDate instanceof Date)){
      startDate = new Date(this.model.startDate);
    }
    else{
      startDate = this.model.startDate;
    }
    isValid = endDate.getTime() >= startDate.getTime();
    if(!isValid){
      this.datesError = "Start date has to be earlier or equal to the end date.";
    }
    else{
      this.datesError = "";
    }
    
    return isValid;
    
  }
}
