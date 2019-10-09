import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsQrDeleteComponent } from './coupons-qr-delete.component.ts';

describe('CouponsQrDeleteComponent', () => {
  let component: CouponsQrDeleteComponent;
  let fixture: ComponentFixture<CouponsQrDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsQrDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsQrDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
