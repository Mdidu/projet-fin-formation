import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListUserComponent } from './group-list-user.component';

describe('GroupListUserComponent', () => {
  let component: GroupListUserComponent;
  let fixture: ComponentFixture<GroupListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
