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
  token = localStorage.getItem('token');
  // value1 : any = [];

  ngOnInit() {
  }
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
  value1 = [];
  addLabel()
  {
    // var value1 = [];
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            this.value1.push(data['data']['details'][i])
          }
        }
        console.log(this.value1);
      },
      error => {
        console.log("Error", error);
      })
  }
  check(label)
  {
    this.myHttpService.postNotes('/notes/'+ this.notedetails.id +'/addLabelToNotes/' + label + '/add',
    {
      "noteId" : this.notedetails.id,
      "lableId" : label
    },
     this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      })
  }
}