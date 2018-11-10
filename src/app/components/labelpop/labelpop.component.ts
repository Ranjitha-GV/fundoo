import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-labelpop',
  templateUrl: './labelpop.component.html',
  styleUrls: ['./labelpop.component.scss']
})
export class LabelpopComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }

  ngOnInit() {
  }
}
