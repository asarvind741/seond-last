import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRfpComponent } from './edit-rfp.component';

describe('EditRfpComponent', () => {
  let component: EditRfpComponent;
  let fixture: ComponentFixture<EditRfpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRfpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRfpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
