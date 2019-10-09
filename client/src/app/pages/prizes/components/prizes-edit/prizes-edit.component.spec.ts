import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizesEditComponent } from './prizes-edit.component.ts';

describe('PrizesEditComponent', () => {
  let component: PrizesEditComponent;
  let fixture: ComponentFixture<PrizesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
