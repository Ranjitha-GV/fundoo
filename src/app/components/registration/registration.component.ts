import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {ConfigService} from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  advance()
  {
    this.router.navigateByUrl('/login');
    return {"data":[{"name": "advance"}]};
  }

  basic()
  {
    this.router.navigateByUrl('/login');
    return {"data":[{"name": "basic"}]};
  }
  ngOnInit() {
  }

}
