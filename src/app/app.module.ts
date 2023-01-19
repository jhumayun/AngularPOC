import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignListItemComponent } from './components/campaign-list-item/campaign-list-item.component';
import { CampaignAddComponent } from './components/campaign-add/campaign-add.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SortableHeaderComponent } from './components/sortable-header/sortable-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignListItemComponent,
    CampaignAddComponent,
    PageNotFoundComponent,
    SortableHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    RouterModule.forRoot([
      {path: 'campaigns', component: CampaignListComponent},
      {path: '', redirectTo: '/campaigns', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
