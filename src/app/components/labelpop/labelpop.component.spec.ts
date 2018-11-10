import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelpopComponent } from './labelpop.component';

describe('LabelpopComponent', () => {
  let component: LabelpopComponent;
  let fixture: ComponentFixture<LabelpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
