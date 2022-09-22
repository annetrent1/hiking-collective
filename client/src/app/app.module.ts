import { BadgeModule } from 'primeng-lts/badge';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng-lts/button';
import { CardModule } from 'primeng-lts/card';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng-lts/dataview';
import { DialogModule } from 'primeng-lts/dialog';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { RouterModule } from '@angular/router';
import { StateCardComponent } from './state-card/state-card.component';
import { StateListComponent } from './state-list/state-list.component';
import { GroupModalComponent } from './group-modal/group-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupListComponent,
    StateCardComponent,
    StateListComponent,
    GroupModalComponent,
  ],
  imports: [
    AppRoutingModule,
    BadgeModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    BrowserModule,
    CardModule,
    CommonModule,
    DataViewModule,
    DialogModule,
    HttpClientModule,
    RouterModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
