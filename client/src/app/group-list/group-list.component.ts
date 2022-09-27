import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/groups';
import { State } from '../models/states';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  display: boolean = false;
  states: string[] = [];
  selectedState!: string;
  filteredGroups: Group[] = [];
  selectedGroup: any;

  constructor(
    private groupsService: GroupsService,
    private stateService: StatesService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.snapshot.params.StateName) {
      this.selectedState = this.activatedRoute.snapshot.params.StateName;
    }
    console.log('ROUTE', this.activatedRoute.snapshot);
  }

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
        this.filterState(this.selectedState);
      },
      error: () => {
        console.log('groups oops');
      },
      complete: () => {
        console.log('groups done');
      },
    });
    this.stateService.getStates().subscribe((response) => {
      response.forEach((state) => {
        this.states.push(state.StateName);
      });
      console.log('check', this.states);
    });
  }

  showDialog(groupData: any) {
    this.display = true;
    this.selectedGroup = groupData;
    console.log('Show Dialog', this.display);
  }

  filterState(state: string) {
    if (state) {
      this.filteredGroups = this.groups.filter(
        (group) => group.StateName == state
      );
    } else {
      this.filteredGroups = this.groups;
    }
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display)
  }
}
