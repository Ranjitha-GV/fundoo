import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../app/core/services/logger/logger.service';
import { MessagingService } from '../../core/services/messaging/messaging.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { UsersService } from 'src/app/core/services/users/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public router: Router, public snackBar: MatSnackBar, public myHttpService:
    UsersService, public message : MessagingService, public httpService: NotesServiceService) { }

  private hide = true;
  private clickedDivState = 'start';
  private token = localStorage.getItem('token');
  model: any = {};
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,
  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

/**Change division for email and password */
  changeDivState() {
    if (!this.email.invalid) {
      this.clickedDivState = 'end';
    }
    else {

      this.snackBar.open("Login", "failed", {
        duration: 2000
      })
    }
  }
/**Validations */
  getErrorMessage() {
    return this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
      '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('pattern') ? 'Not a valid Password! Please follow the correct format' :
      '';
  }
/**Hitting API for login */
  login() {
    this.myHttpService.login({
      "email": this.model.email,
      "password": this.model.password
    })
    .pipe(takeUntil(this.destroy$))
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
          let pushToken = localStorage.getItem('pushToken');
          this.router.navigateByUrl('/home');
          this.httpService.pushNotifications( 
          {'pushToken' : pushToken})
          .pipe(takeUntil(this.destroy$))
          .subscribe((data)=>
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
/**Unsubscribe function */
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}