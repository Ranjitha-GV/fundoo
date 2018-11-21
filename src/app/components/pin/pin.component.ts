import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  constructor(public httpService: NotesServiceService) { }

  private show = 0;
  @Input() pinArray;
  @Output() pinEmit = new EventEmitter();
  

  ngOnInit() {
  }
  token = localStorage.getItem('token');
  pin() {
    this.show = 1;
    this.httpService.pinUnpin(
      {
        "noteIdList": [this.pinArray.id],
        "isPined": true
      }).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

  unPin()
  {
    this.show = 0;
    this.httpService.pinUnpin(
      {
        "noteIdList": [this.pinArray.id],
        "isPined": false
      }).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

}
