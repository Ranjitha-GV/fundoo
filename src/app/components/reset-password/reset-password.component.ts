import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users/users.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(public myHttpService: UsersService, public snackBar: MatSnackBar) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  model: any = {};

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
        '';
  }
  reset() {
    if (!this.email.invalid) {
      this.myHttpService.userReset({
        "email": this.model.email,
      })
        .subscribe(
          (data) => {
            this.snackBar.open("Email Sent to your mail", "Reset password using the sent link", {
              duration: 3000
            })

          },
          error => {
            this.snackBar.open("Invalid email address", "Reset failed", {
              duration: 3000
            })
          })
    }
    else {
      this.snackBar.open("Please do not leave email field empty", "Email required", {
        duration: 3000
      })
    }
  }
  ngOnInit() {
  }

}
