import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(()=>{
    component.model.email.setValue('');
    component.model.email.setValue('@bb.AA.com');
    component.model.email.setValue('AA.23@bbb.com');

    component.model.password.setValue('');
    component.model.password.setValue('ak');
    component.model.password.setValue('aaaaaaaaaaaaaaaaaaa');

    component.model.firstname.setValue('');
    component.model.firstname.setValue('ku');

    component.model.lastname.setValue('');
    component.model.lastname.setValue('hj');
    
    component.model.service.setValue('');
    expect(component.model.valid).toBeFalsy();
    
}))
it('Form should be valid', async(()=>{
  component.model.firstname.setValue('Ranjitha');
  component.model.firstname.setValue('sfsdgtdrfgyfghfhyh');
  component.model.lastname.setValue('gowda');
  component.model.lastname.setValue('sfdgfdghfgh');
  component.model.email.setValue('abccc@bbbb.com');
  component.model.password.setValue('Casperaspike@10');
  expect(component.model.valid).toBeTruthy();
}))
it('Form Invalid when empty', () => {
  expect(component.model.valid).toBeFalsy();
});
});
