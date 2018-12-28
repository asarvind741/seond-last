import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPlansComponent } from './supplier-plans.component';

describe('SupplierPlansComponent', () => {
  let component: SupplierPlansComponent;
  let fixture: ComponentFixture<SupplierPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
