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

  constructor(
    private stateService: StatesService,
    private groupService: GroupsService,
    private confService: ConfirmationService
  ) {
    this.setForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.groupForm.untouched) {
      this.setForm();
      if (this.selectedState && this.groupForm) {
        this.groupForm.setValue({ StateName: this.selectedState });
      }
      console.log('selectedState change', this.selectedState);
      console.log('selectedGroup change', this.selectedGroup);
    }
  }

  ngOnInit(): void {}

  setForm() {
    this.groupForm = new FormGroup(
      {
        GroupName: new FormControl(null, { validators: Validators.required }),
        StateName: new FormControl(null, { validators: Validators.required }),
        MaxGroupSize: new FormControl(null, {
          validators: Validators.required,
        }),
        SponsorEmail: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        SponsorName: new FormControl(null, { validators: Validators.required }),
        SponsorPhone: new FormControl(null, [Validators.required]),
      },
      { updateOn: 'blur' }
    );
  }

  onSubmit(formValues: any): void {
    console.log('SUBMIT', formValues);
    this.groupService.addGroup(formValues).subscribe((response: any) => {
      console.log('add response', response);
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
        //confirm action
        this.closeModal();
      },
      reject: () => {
        //reject action
      },
    });
  }
}
