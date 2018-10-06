import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm : FormGroup;

constructor(private router: Router) { }

next()
{
  this.router.navigateByUrl('/registration');
}


ngOnInit() {
this.LoginForm = new FormGroup({

emailId : new FormControl(),
password : new FormControl()

   });
   }

}
