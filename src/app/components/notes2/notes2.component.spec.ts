import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Notes2Component } from './notes2.component';

describe('Notes2Component', () => {
  let component: Notes2Component;
  let fixture: ComponentFixture<Notes2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Notes2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Notes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
