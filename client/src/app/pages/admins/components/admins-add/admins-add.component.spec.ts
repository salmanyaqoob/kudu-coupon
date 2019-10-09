import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsAddComponent } from './admins-add.component.ts';

describe('AdminsAddComponent', () => {
  let component: AdminsAddComponent;
  let fixture: ComponentFixture<AdminsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
