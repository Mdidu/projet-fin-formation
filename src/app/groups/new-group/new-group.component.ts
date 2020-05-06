import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {GroupsService} from '../../services/group/groups.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit, OnDestroy {

  groupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService,
              public groupsService: GroupsService) { }

  ngOnInit() {
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
      descriptionGroup: ['', Validators.required],
      security: ['', Validators.required],
      visibility: ['', Validators.required],
      id: this.authService.currentUser.id
    });
  }

  onSubmit() {
    const data = this.groupForm.value;

    this.groupsService.addGroup(data);
  }

  ngOnDestroy() {
    this.groupsService.groupClean();
  }
}
