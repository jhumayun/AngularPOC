import { Component, ViewChild } from '@angular/core';
import { Campaign } from '../../DataModels/Campaign';
import { CampaignService } from '../../services/campaign.service';
import { CampaignMsgService, CampaignOpMode } from '../../services/campaign-msg.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ColumnDefinition, SortDirection, SortSate } from '../sortable-header/ColumnDefinition';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent {
  searchText: string = "";
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  columnDefinition: ColumnDefinition[] = [];
  sortState!: SortSate;

  @ViewChild(MatSort)  sort!: MatSort;
  displayedColumns = ['id', 'name', 'startDate', 'endDate'];
  matDataSource = new MatTableDataSource(this.campaigns);

  constructor(private campaignService: CampaignService, private campaignMsgSvc: CampaignMsgService){
    this.columnDefinition.push(new ColumnDefinition("#","", false));
    this.columnDefinition.push(new ColumnDefinition("Id","id", true));
    this.columnDefinition.push(new ColumnDefinition("Campaign Name","name", true)); 
    this.columnDefinition.push(new ColumnDefinition("Start Date","startDate", true));
    this.columnDefinition.push(new ColumnDefinition("End Date","endDate", true));
    this.columnDefinition.push(new ColumnDefinition("Actions","", false));

    this.sortState = new SortSate(this.columnDefinition[1], SortDirection.ASC);
  }
  
  ngOnInit(): void {
    this.getCampaigns();
  }

  ngAfterViewInit() {
    this.matDataSource.sort = this.sort;
  }

  onSortStateChange(){
    this.applySorting();
  }

  applySorting(){
    if(this.sortState.sortDirection == SortDirection.ASC ){
      switch(this.sortState.column.attributeName){
        case "id":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.id < b.id ? -1: 1));
        break;
        case "name":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.name < b.name ? -1: 1))
        break;
        case "startDate":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.startDate < b.startDate ? -1: 1))
        break;
        case "endDate":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.endDate < b.endDate ? -1: 1))
        break;
      }
    }
    else{
      switch(this.sortState.column.attributeName){
        case "id":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.id > b.id ? -1: 1));
        break;
        case "name":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.name > b.name ? -1: 1))
        break;
        case "startDate":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.startDate > b.startDate ? -1: 1))
        break;
        case "endDate":
          this.filteredCampaigns.sort((a: Campaign, b: Campaign) => (a.endDate > b.endDate ? -1: 1))
        break;
      }
    }
  }

  resetSearchText(){
    this.searchText = "";
    this.filterCampaigns();
  }

  filterCampaigns(){
    if(this.searchText == ""){
      this.filteredCampaigns = this.campaigns;   
    }
    else{
      this.filteredCampaigns = this.campaigns.filter((c)=>{
        let show: boolean = false;
        if(c.name.toLowerCase().includes(this.searchText.toLowerCase())){
          show = true;
        }
        if(c.id.toString().includes(this.searchText.toLowerCase())){
          show = true;
        }
        return show;
      });
    }
    this.matDataSource.data = this.filteredCampaigns;
    this.applySorting();    
  }
  
  getCampaigns(): void {
    this.campaignService.getCampaigns().subscribe(
      (campaigns) => {
        this.campaigns = campaigns;
        this.filterCampaigns();
        this.matDataSource.data = this.filteredCampaigns;
      }
    );
  }


  addCampaign(campaign: Campaign){
    this.campaignService.addCampaign(campaign).subscribe(
       () => {
        this.campaigns.push(campaign);
        this.filterCampaigns();
        this.matDataSource.data = this.filteredCampaigns;
       } 
    );
  }

  editCampaign(campaign: Campaign){
    this.campaignService.editCampaign(campaign).subscribe(
       () => {
        let index = this.filteredCampaigns.findIndex(c => c.id == campaign.id);
        this.filteredCampaigns[index] = campaign;
        this.filterCampaigns();
        this.matDataSource.data = this.filteredCampaigns;
       } 
    );
  }

  deleteCampaign(campaign: Campaign){
    this.campaignService.deleteCampaign(campaign).subscribe( 
      () => {
        this.campaigns = this.campaigns.filter((c)=>c.id!==campaign.id);
        this.filterCampaigns();
        this.matDataSource.data = this.filteredCampaigns;
      }
    );
  }

  editCampaignForm(campaign: Campaign){
    this.campaignMsgSvc.setCampaign(campaign);
    this.campaignMsgSvc.setCampaignOp(CampaignOpMode.update);
  }
}
