import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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
    return {"data":[{"name": "basic"}]};
  }

  ngOnInit() {
  }

}
