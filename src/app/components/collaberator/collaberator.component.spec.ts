import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaberatorComponent } from './collaberator.component';

describe('CollaberatorComponent', () => {
  let component: CollaberatorComponent;
  let fixture: ComponentFixture<CollaberatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaberatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaberatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
