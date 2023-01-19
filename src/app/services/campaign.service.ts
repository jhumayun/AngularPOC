import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Campaign } from '../DataModels/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = 'http://localhost:5000/campaigns';

  constructor(private http: HttpClient) { }

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl);
  }

  addCampaign(campaign: Campaign):Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign);
  }
  
  deleteCampaign(campaign: Campaign):Observable<Campaign> {
    const url = `${this.apiUrl}/${campaign.id}`
    return this.http.delete<Campaign>(url);
  }
}
