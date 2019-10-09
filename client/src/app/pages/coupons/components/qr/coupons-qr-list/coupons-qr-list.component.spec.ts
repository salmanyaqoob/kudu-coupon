import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsQrListComponent } from './coupons-qr-list.component.ts';

describe('CouponsQrListComponent', () => {
  let component: CouponsQrListComponent;
  let fixture: ComponentFixture<CouponsQrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponsQrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponsQrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
