import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCardComponent } from './state-card.component';

describe('StateCardComponent', () => {
  let component: StateCardComponent;
  let fixture: ComponentFixture<StateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
