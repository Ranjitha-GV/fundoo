import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('Form should be valid '),async(()=> {
    expect(component.model.email.toEqual('nish@gmail.com'));
    expect(component.model.password.toEqual('Casperspike@10'));
    expect(component.model.email).toBeTruthy();
    expect(component.model.password).toBeTruthy();
    })
    
    it('Invalid Form'),async(()=> {
    expect(component.model.email.toEqual('1212323'));
    expect(component.model.password.toEqual(''));
    expect(component.model.email).toBeFalsy();
    expect(component.model.password).toBeFalsy();
    })
});
