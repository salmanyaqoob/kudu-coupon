import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsQrAddComponent } from './coupons-qr-add.component.ts';

describe('CouponsQrAddComponent', () => {
  let component: CouponsQrAddComponent;
  let fixture: ComponentFixture<CouponsQrAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsQrAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsQrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
