import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriptionComponent } from './add-subscription.component';

describe('AddUserComponent', () => {
  let component: AddSubscriptionComponent;
  let fixture: ComponentFixture<AddSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
