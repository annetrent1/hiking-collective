import { BadgeModule } from 'primeng-lts/badge';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ButtonModule } from 'primeng-lts/button';
import { CardModule } from 'primeng-lts/card';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng-lts/dataview';
import { DialogModule } from 'primeng-lts/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {InputNumberModule} from 'primeng-lts/inputnumber';
import { InputTextModule } from 'primeng-lts/inputtext';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupComponent } from './group/group.component';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { GroupListComponent } from './group-list/group-list.component';
import { StateCardComponent } from './state-card/state-card.component';
import { StateListComponent } from './state-list/state-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComponent,
    GroupListComponent,
    GroupModalComponent,
    StateCardComponent,
    StateListComponent,
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
    FormsModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    RouterModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
