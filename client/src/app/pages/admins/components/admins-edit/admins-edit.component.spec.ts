import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsEditComponent } from './admins-edit.component.ts';

describe('AdminsEditComponent', () => {
  let component: AdminsEditComponent;
  let fixture: ComponentFixture<AdminsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
