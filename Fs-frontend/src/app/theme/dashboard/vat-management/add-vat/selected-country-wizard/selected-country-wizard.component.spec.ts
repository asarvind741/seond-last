import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCountryWizardComponent } from './selected-country-wizard.component';

describe('WizardNavbarRightComponent', () => {
  let component: SelectedCountryWizardComponent;
  let fixture: ComponentFixture<SelectedCountryWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedCountryWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCountryWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
