import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomRegistrationComponent } from './custom-registration.component';

describe('BasicRegComponent', () => {
  let component: CustomRegistrationComponent;
  let fixture: ComponentFixture<CustomRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
