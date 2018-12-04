import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProfile2Component } from './company-profile2.component';

describe('UserProfileComponent', () => {
  let component: CompanyProfile2Component;
  let fixture: ComponentFixture<CompanyProfile2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProfile2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProfile2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
