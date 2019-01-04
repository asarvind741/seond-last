import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSupplierComponent } from './contact-supplier.component';

describe('ContactSupplierComponent', () => {
  let component: ContactSupplierComponent;
  let fixture: ComponentFixture<ContactSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
