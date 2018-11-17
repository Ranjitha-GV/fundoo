import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../../app/core/services/logger/logger.service';
import { MessagingService } from '../../core/services/messaging/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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

  constructor(private router: Router, private snackBar: MatSnackBar, private myHttpService:
    HttpService, private message : MessagingService) { }

  hide = true;
  clickedDivState = 'start';
  model: any = {};
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,
  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

  changeDivState() {
    console.log(this.email.value);
    if (!this.email.invalid) {
      this.clickedDivState = 'end';
    }
    else {

      this.snackBar.open("Login", "failed", {
        duration: 2000
      })
    }
  }

  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
      '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('pattern') ? 'Not a valid Password! Please follow the correct format' :
      '';
  }
  login() {
    this.myHttpService.loginPost('/user/login', {
      "email": this.model.email,
      "password": this.model.password
    })
      .subscribe(
        (data) => {
          this.snackBar.open("Login successfull", "success", {
            duration: 3000
          })
          localStorage.setItem('token', data['id']);
          localStorage.setItem('firstname', data['firstName']);
          localStorage.setItem('lastname', data['lastName']);
          localStorage.setItem('email', data['email']);
          localStorage.setItem('userId', data['userId']);
          localStorage.setItem('imageUrl', data['imageUrl']);
          var pushToken = localStorage.getItem('pushToken');
          var token = localStorage.getItem('token');
          this.router.navigateByUrl('/home');
          this.myHttpService.postArchive('/user/registerPushToken', 
          {'pushToken' : pushToken}, token).subscribe((data)=>
           {
             LoggerService.log('pushToken', data);
           },
        error=>
          {
             LoggerService.log('Error', error);
          })
      },
        error => {
          this.snackBar.open("Invalid email or password", "fail", {
            duration: 3000
          })
        })
    this.model.email = '';
    this.model.password = '';
  }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');     
    }

  }
}