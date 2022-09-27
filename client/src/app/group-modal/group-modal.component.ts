import { HttpHeaders } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { ConfirmationService } from 'primeng-lts/api';
// import { ConfirmationService } from 'primeng/api';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss'],
})
export class GroupModalComponent implements OnInit, OnChanges {
  @Input() states!: string[];
  @Input() selectedState!: string;
  @Input() selectedGroup!: any;
  @Output() close = new EventEmitter<boolean>();
  groupForm!: FormGroup;
  visible = true;
  isNewGroup!: boolean;

  constructor(
    private stateService: StatesService,
    private groupService: GroupsService,
    private confService: ConfirmationService
  ) {
    this.setForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.groupForm.untouched) {
    //   this.setForm();
    //   if (this.selectedState && this.groupForm) {
    //     this.groupForm.setValue({ StateName: this.selectedState });
    //   }
    //   console.log('selectedState change', this.selectedState);
    //   console.log('selectedGroup change', this.selectedGroup);
    // }
  }

  ngOnInit(): void {
    console.log('selectedState', this.selectedState);
    console.log('selectedGroup ', this.selectedGroup);
    if (this.selectedGroup) {
      this.groupForm = new FormGroup(
        {
          GroupName: new FormControl(this.selectedGroup.GroupName, { validators: Validators.required }),
          StateName: new FormControl(
            this.selectedGroup.StateName,
            { validators: Validators.required }
          ),
          MaxGroupSize: new FormControl(this.selectedGroup.MaxGroupSize, {
            validators: Validators.required,
          }),
          SponsorEmail: new FormControl(this.selectedGroup.SponsorEmail, [
            Validators.required,
            Validators.email,
          ]),
          SponsorName: new FormControl(this.selectedGroup.SponsorName, {
            validators: Validators.required,
          }),
          SponsorPhone: new FormControl(this.selectedGroup.SponsorPhone, [Validators.required]),
          GroupId: new FormControl(this.selectedGroup.GroupId),
        },
        { updateOn: 'blur' }
      );
      this.isNewGroup = false;
    } else {
      this.groupForm = new FormGroup(
        {
          GroupName: new FormControl(null, { validators: Validators.required }),
          StateName: new FormControl(
            this.selectedState ? this.selectedState : null,
            { validators: Validators.required }
          ),
          MaxGroupSize: new FormControl(null, {
            validators: Validators.required,
          }),
          SponsorEmail: new FormControl(null, [
            Validators.required,
            Validators.email,
          ]),
          SponsorName: new FormControl(null, {
            validators: Validators.required,
          }),
          SponsorPhone: new FormControl(null, [Validators.required]),
        },
        { updateOn: 'blur' }
      );
      this.isNewGroup = true;
    }
  }

  setForm() {}

  onSubmit(formValues: any): void {
    console.log('SUBMIT', formValues);
    this.groupService.addGroup(formValues).subscribe((response: any) => {
      console.log('add response', response);
    });
  }

  onUpdate(formValues: any): void {
    console.log('Edit', formValues);
    this.groupService.editGroup(formValues).subscribe((response: any) => {
      console.log('edit response', response);
    });
  }

  closeModal() {
    this.close.emit(true);
  }

  deleteGroup(event: any) {
    console.log('EVENT: ', event);
    this.confService.confirm({
      target: event.target,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log('delete confirm', this.selectedGroup.GroupId);
        this.groupService.deleteGroup(this.selectedGroup.GroupId).subscribe((response: any) => {
          console.log('delete response', response);
        });
        this.closeModal();
      },
      reject: () => {
        //reject action
      },
    });
  }
}
