import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  model: any = {};

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is Required' :
      this.email.hasError('email') ? 'Not a valid email! Required format: abcd@gmail.com' :
        '';
  }
  reset() {
    if (!this.email.invalid) {
      this.myHttpService.resetPass('/user/reset', {
        "email": this.model.email,
      })
        .subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            this.snackBar.open("Email Sent to your mail", "Reset password using the sent link", {
              duration: 3000
            })

          },
          error => {
            console.log("Error", error);
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
