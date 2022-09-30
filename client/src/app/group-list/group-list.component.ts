import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.getGroups();
    this.stateService.getStates().subscribe({
      next: (response: State[]) => {
        response.forEach((state) => {
          this.states.push(state.StateName);
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong`,
        });
      },
      complete: () => {
        if (this.activatedRoute.snapshot.params.StateName) {
          this.selectedState = this.activatedRoute.snapshot.params.StateName;
        }
        this.filterState(this.selectedState);
      },
    });
  }

  getGroups() {
    this.groupsService.getGroups().subscribe({
      next: (response: Group[]) => {
        this.groups = response;
        this.cd.detectChanges();
        if (Array.isArray(this.groups)) {
          this.filterState(this.selectedState);
        }
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Something went wrong, the groups were not able to load`,
        });
      },
      complete: () => {
        this.filterState(this.selectedState);
      }
    });
  }

  showDialog(groupData: any) {
    this.display = true;
    this.selectedGroup = groupData;
  }

  filterState(state: string) {
    this.updateRoute(state);
    if (state && Array.isArray(this.groups)) {
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
    this.getGroups();
  }

  selectGroup(group: Group) {
    this.groupsService.setSelectedGroup(group);
  }

  isMaxCapacity(group: any) {
    return group.Members.length < group.MaxGroupSize;
  }
}
