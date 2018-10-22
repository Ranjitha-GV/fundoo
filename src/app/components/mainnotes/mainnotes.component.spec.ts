import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainnotesComponent } from './mainnotes.component';

describe('MainnotesComponent', () => {
  let component: MainnotesComponent;
  let fixture: ComponentFixture<MainnotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainnotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
