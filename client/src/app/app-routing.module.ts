import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';
import { MemberListComponent } from './member-list/member-list.component';
import { Group } from './models/groups';
import { State } from './models/states';
import { StateListComponent } from './state-list/state-list.component';

const routes: Routes = [
  { path: '', component: StateListComponent},
  { path: 'groups', component: GroupListComponent},
  { path: 'groups/:StateName', component: GroupListComponent},
  { path: 'members/:GroupId', component: MemberListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
