import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { animate, state, style, transition, trigger } from '@angular/animations';



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
  next() {
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {

  }
}


