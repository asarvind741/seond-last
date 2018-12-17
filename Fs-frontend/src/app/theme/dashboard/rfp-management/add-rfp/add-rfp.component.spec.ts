import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRfpComponent } from './add-rfp.component';

describe('AddRfpComponent', () => {
  let component: AddRfpComponent;
  let fixture: ComponentFixture<AddRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
