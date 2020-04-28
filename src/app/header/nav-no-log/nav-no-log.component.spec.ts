import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavNoLogComponent } from './nav-no-log.component';

describe('NavNoLogComponent', () => {
  let component: NavNoLogComponent;
  let fixture: ComponentFixture<NavNoLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavNoLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavNoLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
