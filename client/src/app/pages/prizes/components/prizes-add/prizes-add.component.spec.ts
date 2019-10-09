import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizesAddComponent } from './prizes-add.component.ts';

describe('PrizesAddComponent', () => {
  let component: PrizesAddComponent;
  let fixture: ComponentFixture<PrizesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
