import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessageListComponent } from './private-message-list.component';

describe('PrivateMessageListComponent', () => {
  let component: PrivateMessageListComponent;
  let fixture: ComponentFixture<PrivateMessageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMessageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
