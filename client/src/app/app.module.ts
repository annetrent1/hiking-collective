import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {CardModule} from 'primeng-lts/card';
// import {DataViewModule} from 'primeng-lts/dataview';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StateCardComponent } from './state-card/state-card.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule } from '@angular/router';
import { StateListComponent } from './state-list/state-list.component';
import { GroupComponent } from './group/group.component';

@NgModule({
  declarations: [
    AppComponent,
    StateCardComponent,
    GroupListComponent,
    StateListComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    CommonModule,
    // DataViewModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
