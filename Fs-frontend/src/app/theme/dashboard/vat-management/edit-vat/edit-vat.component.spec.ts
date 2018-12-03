import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVatComponent } from './edit-vat.component';

describe('WizardNavbarRightComponent', () => {
  let component: EditVatComponent;
  let fixture: ComponentFixture<EditVatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
