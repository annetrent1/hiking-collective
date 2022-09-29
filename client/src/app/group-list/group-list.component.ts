import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../models/groups';
import { State } from '../models/states';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';
import { MessageService } from 'primeng-lts/api';

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
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private location: Location,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.groupsService.getGroups().subscribe({
      next: (response) => {
        this.groups = response;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong, the groups were not able to load`,
        });
      }
    });
    this.stateService.getStates().subscribe({
      next: (response) => {
        response.forEach((state) => {
          this.states.push(state.StateName);
        });
        console.log('check', this.states);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong`,
        });
      },
      complete: () => {
        console.log('complete');
        if (this.activatedRoute.snapshot.params.StateName) {
          this.selectedState = this.activatedRoute.snapshot.params.StateName;
        }
        this.filterState(this.selectedState);
      },
    });
  }

  showDialog(groupData: any) {
    this.display = true;
    this.selectedGroup = groupData;
    console.log('Show Dialog', this.display);
  }

  filterState(state: string) {
    this.updateRoute(state);
    if (state) {
      this.filteredGroups = this.groups.filter(
        (group) => group.StateName == state
      );
    } else {
      this.filteredGroups = this.groups;
    }
  }

  updateRoute(state: string) {
    if (state) {
      this.location.replaceState(`groups/${state}`);
    } else {
      this.location.replaceState(`groups`);
    }
  }

  close(evt: boolean) {
    this.display = false;
    console.log('close', this.display);
  }

  selectGroup(group: Group) {
    this.groupsService.setSelectedGroup(group);
  }
}
