import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(public myHttpService: UsersService, public route: ActivatedRoute, 
  public snackBar: MatSnackBar) { }

  resetForm: FormGroup;
  model: any = {};
  private hide = true;
  private hide1 = true;
  private accessToken = this.route.snapshot.params.forgotToken;
  private input = new FormData();
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]);

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
  reset() {
    let pass = this.model.password;
    let confirmPass = this.model.confirmPassword;
    if (pass != confirmPass) {
      this.snackBar.open("Password Mismatch", "failed", {
        duration: 3000
      })
      return false;
    }
    else {
      this.snackBar.open("Reset Successfull", "Successfull", {
        duration: 3000
      })
    }
    var body = {
      "newPassword": this.model.password
    }
    if (this.model.password.length == 0) {
      return;
    }
    this.input.append('newPassword', this.model.password);
    this.myHttpService.resetPassword(body, this.accessToken).subscribe(response => {
    }, error => {
    })
  }

  ngOnInit() {
  }

}
