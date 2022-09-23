import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-member-modal',
  templateUrl: './member-modal.component.html',
  styleUrls: ['./member-modal.component.scss']
})
export class MemberModalComponent implements OnInit {
  @Input() groupId: any;

  memberForm!: FormGroup;

  constructor(private groupService: GroupsService) { 
    this.memberForm = new FormGroup({
      MemberName: new FormControl(null, {validators: Validators.required}),
      MemberPhone: new FormControl(null, {validators: Validators.required}),
      MemberEmail: new FormControl(null, [Validators.required, Validators.email])
    }, {updateOn: 'blur'})
  }

  ngOnInit(): void {
  }

  onSubmit(formValues: any): void {
    console.log("SUBMIT", formValues);
    this.groupService.addMember(formValues, this.groupId).subscribe(
      (response: any) => {console.log("add response", response)}
    )
  }

}
