import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../core/services/http/http.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private myHttpService: HttpService, public route: ActivatedRoute, 
  private snackBar: MatSnackBar) { }

  resetForm: FormGroup;
  model: any = {};
  hide = true;
  hide1 = true;
  public accessToken = this.route.snapshot.params.forgotToken;
  public input = new FormData();
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
    this.myHttpService.resetPost("/user/reset-password", body, this.accessToken).subscribe(response => {
    }, error => {
    })
  }

  ngOnInit() {
  }

}
