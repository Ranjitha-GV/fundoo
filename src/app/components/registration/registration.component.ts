import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [
    trigger('basicani', [state('open', style({
      "height": "115px",
      "width": "150px",
      background: "rgb(52, 152, 219)",
      "word-wrap": "break-word"
    })),
    state('closed', style({
      "height": "115px",
      "width": "150px",
      background: "goldenrod",
      "word-wrap": "break-word"
    })),
    transition('open => closed', [
      animate('1s')
    ]),
      // transition('closed => open', [
      //   animate('0.5s')
      // ]),
    ]),
    trigger('advanceani', [
      state('open', style({
        "height": "115px",
        "width": "150px",
        "background": "rgb(52, 152, 219)",
        "word-wrap": "break-word"
      })),
      state('closed', style({
        "height": "115px",
        "width": "150px",
        "background": "goldenrod",
        "word-wrap": "break-word"
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      // transition('closed => open', [
      //   animate('1s')
      // ]),
    ]),
  ]
})

export class RegistrationComponent implements OnInit {
  records = {};
  basic: any;
  advance: any;
  basicset = true;
  advanceset = true;
  registrationForm : FormGroup;
  constructor(private router: Router, private myHttpService: HttpService) { }

  advanceFunc() {
    this.basicset = !this.basicset;
    this.records = this.myHttpService.getConfig().subscribe(data => {
      console.log('response', data);
      this.advance = data["data"].data[1].description;
    })
  }

  basicFunc() {
    this.advanceset = !this.advanceset;
    this.records = this.myHttpService.getConfig().subscribe(data => {
      console.log('response', data);
      this.basic = data["data"].data[0].description;
    })
  }
  // next() {
  //   this.router.navigateByUrl('/login');
  // }

model:any={};
service:any;

  next(){

    console.log(this.model.firstname);
    console.log(this.model.lastname);
    console.log( this.model.email);
    this.myHttpService
        .addData('/user/userSignUp', {
        "firstName": this.model.firstname,
        "lastName": this.model.lastname,
        "phoneNumber": "8867684833",
        "service": "string",
        "email": this.model.email ,
        "emailVerified": true,
        "password": this.model.password,
        "username": this.model.email, 
       "createdDate": "2018-10-09T06:35:12.617Z",
      "modifiedDate": "2018-10-09T06:35:12.617Z",

    })
    .subscribe(
      (data )=> {
          console.log("POST Request is successful ", data);

      },
      error => {
          console.log("Error", error);
      })

  }
  

  ngOnInit() 
  {
    // this.registrationForm = new FormGroup({
    //   firstname : new FormControl(),
    //   lastname : new FormControl(),
    //   email : new FormControl(),
    //   password : new FormControl(),
    //   confirmPassword : new FormControl()
    // });
        
  }
}


