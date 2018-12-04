import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLeadComponent } from './about-lead.component';

describe('AboutLeadComponent', () => {
  let component: AboutLeadComponent;
  let fixture: ComponentFixture<AboutLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
