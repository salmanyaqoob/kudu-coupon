import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizesDeleteComponent } from './prizes-delete.component.ts';

describe('PrizesDeleteComponent', () => {
  let component: PrizesDeleteComponent;
  let fixture: ComponentFixture<PrizesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
