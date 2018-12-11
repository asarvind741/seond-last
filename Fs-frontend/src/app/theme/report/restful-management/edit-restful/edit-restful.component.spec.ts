import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRestfulComponent } from './edit-restful.component';

describe('EditUserComponent', () => {
  let component: EditRestfulComponent;
  let fixture: ComponentFixture<EditRestfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRestfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRestfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
