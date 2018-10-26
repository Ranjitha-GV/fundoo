import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  outputs: ['onNewEntryAdded']

})
export class MoreComponent implements OnInit {


  constructor(private myHttpService: HttpService) { }
  @Input() notedetails;
  @Output() eventEntry = new EventEmitter();

  ngOnInit() {
  }
  token = localStorage.getItem('token');
  delete(id) {
    console.log(this.notedetails);
    this.myHttpService.deleteNotes('/notes/trashNotes', {
      "isDeleted": true,
      "noteIdList": [this.notedetails.id]
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.eventEntry.emit({
        })
      },
      error => {
        console.log("Error", error);
      })
  }
}