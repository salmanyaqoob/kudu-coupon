import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDeleteComponent } from './users-delete.component.ts';

describe('UsersDeleteComponent', () => {
  let component: UsersDeleteComponent;
  let fixture: ComponentFixture<UsersDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
