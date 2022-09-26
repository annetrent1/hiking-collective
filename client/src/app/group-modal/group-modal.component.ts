import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../services/groups.service';
import { StatesService } from '../services/states.service';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  @Input() states: any;
  groupForm!: FormGroup;

  constructor(private stateService: StatesService, private groupService: GroupsService) { 
    this.groupForm = new FormGroup({
      GroupName: new FormControl(null, {validators: Validators.required}),
      StateName: new FormControl(null, {validators: Validators.required}),
      MaxGroupSize: new FormControl(null, {validators: Validators.required}),
      SponsorEmail: new FormControl(null, [Validators.required, Validators.email]),
      SponsorName: new FormControl(null, {validators: Validators.required}),
      SponsorPhone: new FormControl(null, [Validators.required]),
    }, {updateOn: 'blur'})
  }

  ngOnInit(): void {
    // this.groupForm.valueChanges.subscribe(value => console.log("Form Change", value));
    // this.stateService.getStates().subscribe(
    //   (response) => {
    //     response.forEach((state) => {
    //       this.states.push(state.StateName);
    //     });
    //     console.log('check', this.states);
    //   }
    // )
  }

  onSubmit(formValues: any): void {
    console.log("SUBMIT", formValues);
    this.groupService.addGroup(formValues).subscribe(
      (response: any) => {console.log("add response", response)}
    )
  }

}
