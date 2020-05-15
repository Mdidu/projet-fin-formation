import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupsComponent} from '../groups.component';
import {AuthService} from '../../services/auth/auth.service';
import {GroupsService} from '../../services/group/groups.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {

  inviteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private groupsComponent: GroupsComponent,
    public authService: AuthService,
    public groupsService: GroupsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inviteForm = this.formBuilder.group({
      pseudo: ['', Validators.required]
    });
  }
  onSubmit() {
    const pseudo = this.inviteForm.controls.pseudo.value;
    const groupId = this.route.snapshot.params.id;
    this.groupsService.sendInvite(pseudo, groupId);
  }
  ngOnDestroy() {
    this.groupsService.error = '';
    this.groupsService.success = '';
    this.groupsService.groupClean();
  }
}
