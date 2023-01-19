import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Campaign } from '../../DataModels/Campaign';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})

export class CampaignAddComponent implements OnInit {
  @Output() onAddCampaign: EventEmitter<Campaign> = new EventEmitter();
  today: Date = new Date();
  isOpen: boolean = false;
  model!: Campaign;
  datesError: string = "";

  constructor(){}

  ngOnInit(): void {
    this.setDefaultValueForModel();
  }

  ngAfterViewInit(): void {
  }

  toggleForm(){
    if(this.isOpen){
      this.isOpen = false;
    }
    else{
      this.isOpen = true;
    }
  }

  setDefaultValueForModel(){
    this.today.setHours(0);
    this.today.setMinutes(0);
    this.today.setSeconds(0);
    this.today.setMilliseconds(0);
    this.model = new Campaign("", this.today, this.today);
  }

  onSubmit($event: Event, form: NgForm) { 
    $event.preventDefault();
    this.model.id = new Date().getTime();
    this.onAddCampaign.emit(this.model);
    
    this.setDefaultValueForModel();
    this.toggleForm();
  }

  areDatesValid() {
    
    let isValid: boolean = false;
    isValid = this.model.endDate.getTime() >= this.model.startDate.getTime();
    if(!isValid){
      this.datesError = "Start date has to be earlier or equal to the end date.";
    }
    else{
      this.datesError = "";
    }
    
    return isValid;
    
  }
}
