import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }

  @Input() pinArray;
  @Output() pinEmit = new EventEmitter();
  show = 0;

  ngOnInit() {
  }
  token = localStorage.getItem('token');
  pin() {
    this.show = 1;
    this.myHttpService.postArchive('/notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinArray.id],
        "isPined": true
      },
      this.token).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

  unPin()
  {
    this.show = 0;
    this.myHttpService.postArchive('/notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinArray.id],
        "isPined": false
      },
      this.token).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

}
