import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ChangeDetectionStrategy, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.2s 50ms ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  hide = true;
  clickedDivState = 'start';

  changeDivState() {
    console.log(this.email.value);
    if (!this.email.invalid) {
      this.clickedDivState = 'end';
    }
    else {
      alert('Please fill in a valid email address!!');
    }
    // this.router.navigateByUrl('/registration');
  }


  constructor(private router: Router) { }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
        '';
  }
  next() {
    this.router.navigateByUrl('/registration');
  }
  ngOnInit() {

  }
}




