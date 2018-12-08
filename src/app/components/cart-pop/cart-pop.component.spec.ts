import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPopComponent } from './cart-pop.component';

describe('CartPopComponent', () => {
  let component: CartPopComponent;
  let fixture: ComponentFixture<CartPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
