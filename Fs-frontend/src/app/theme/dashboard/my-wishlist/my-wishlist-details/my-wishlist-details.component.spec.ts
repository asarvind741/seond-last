import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlistDetailsComponent } from './my-wishlist-details.component';

describe('MyWishlistDetailsComponent', () => {
  let component: MyWishlistDetailsComponent;
  let fixture: ComponentFixture<MyWishlistDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyWishlistDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyWishlistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
