import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPlansComponent } from './buyer-plans.component';

describe('BuyerPlansComponent', () => {
  let component: BuyerPlansComponent;
  let fixture: ComponentFixture<BuyerPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
