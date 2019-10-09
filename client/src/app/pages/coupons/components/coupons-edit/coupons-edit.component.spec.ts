import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsEditComponent } from './coupons-edit.component.ts';

describe('CouponsEditComponent', () => {
  let component: CouponsEditComponent;
  let fixture: ComponentFixture<CouponsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
