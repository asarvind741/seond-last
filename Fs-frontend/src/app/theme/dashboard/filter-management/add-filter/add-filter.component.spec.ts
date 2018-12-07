import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilterComponent } from './add-filter.component';

describe('AddUserComponent', () => {
  let component: AddFilterComponent;
  let fixture: ComponentFixture<AddFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
