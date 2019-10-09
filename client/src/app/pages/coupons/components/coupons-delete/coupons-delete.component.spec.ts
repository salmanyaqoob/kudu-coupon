import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDeleteComponent } from './coupons-delete.component.ts';

describe('CouponsDeleteComponent', () => {
  let component: CouponsDeleteComponent;
  let fixture: ComponentFixture<CouponsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
