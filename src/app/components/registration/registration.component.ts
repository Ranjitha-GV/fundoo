import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../core/services/users/users.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('basicani', [state('open', style({

    })),
    state('closed', style({

    })),
    transition('open => closed', [
      animate('1s')
    ]),

    ]),
    trigger('advanceani', [
      state('open', style({

      })),
      state('closed', style({

      })),
      transition('open => closed', [
        animate('1s')
      ]),

    ]),
  ]
})

export class RegistrationComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private records = {};
  private cards = [];
  model: any = {};
  private service;
  registrationForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  firstname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  lastname = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
  password = new FormControl('', [Validators.required,
  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

  getErrorMessagefirstName() {
    return this.firstname.hasError('required') ? 'First Name is Required' :
      this.firstname.hasError('pattern') ? 'Invalid First Name! Name should contain only alphabets' :
        '';
  }
  getErrorMessagelastName() {
    return this.lastname.hasError('required') ? 'Last Name is Required' :
      this.lastname.hasError('pattern') ? 'Invalid Last Name! Name should contain only alphabets.' :
        '';
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
        '';
  }
  getErrorMessagePassword() {
    return this.password.hasError('required') ? 'Password is Required' :
      this.password.hasError('pattern') ? 'Not a valid Password! Please follow the correct format' :
        '';
  }
  getErrorMessageConfirmPassword() {
    return this.confirmPassword.hasError('required') ? 'Password is Required' :
      this.confirmPassword.hasError('pattern') ? 'Not a valid Password! Please follow the correct format' :
        '';

  }

  constructor(public router: Router, public myHttpService: UsersService, public snackBar:
    MatSnackBar) { }

  ngOnInit() {
    this.users();
   
  }
  
  users()
  {
  this.records = this.myHttpService.userService()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {
    for (var i = 0; i < data["data"].data.length; i++) {
      data["data"].data[i].select = false;
      this.cards.push(data["data"].data[i]);
    }
    var value = data["data"].data.name;
  })
}

  next() {
    let pass = this.model.password;
    let confirmPass = this.model.confirmPassword;
    if (!this.firstname.invalid && !this.lastname.invalid) {
      if (pass != confirmPass) {
        this.snackBar.open("Password Mismatch", "failed", {
          duration: 3000
        })
        return false;
      }
      else {
        this.snackBar.open("Registration", "Successfull", {
          duration: 3000
        })
      }
    }
    else {
      this.snackBar.open("First name or Last name Invalid", "Failed", {
        duration: 3000
      })
      return false;
    }
    this.myHttpService
      .userSignup({
        "firstName": this.model.firstname,
        "lastName": this.model.lastname,
        "phoneNumber": "8867684833",
        "service": this.service,
        "email": this.model.email,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.email,
        "createdDate": "2018-10-09T06:35:12.617Z",
        "modifiedDate": "2018-10-09T06:35:12.617Z",

      })
      
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {

        },
        error => {
        })
  }

  selectCards(card) {
    this.service = card.name;
    card.select = true;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


