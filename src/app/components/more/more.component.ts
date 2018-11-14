import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  outputs: ['onNewEntryAdded']

})
export class MoreComponent implements OnInit {


  constructor(private myHttpService: HttpService) { }
  @Input() notedetails;
  @Input() addArray;
  @Output() eventEntry = new EventEmitter();
  @Output() checkEmit = new EventEmitter();
  @Output() addLabelEvent = new EventEmitter();
  token = localStorage.getItem('token');
  search: any;
  value1 = null;
  body: any;



  ngOnInit() {
  }

  delete(id) {
    this.myHttpService.deleteNotes('/notes/trashNotes', {
      "isDeleted": true,
      "noteIdList": [this.notedetails.id]
    }, this.token).subscribe(
      (data) => {
        this.eventEntry.emit({
        })
      },
      error => {
      })
  }

  addLabel() {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        this.value1 = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            this.value1.push(data['data']['details'][i])
          }
        }
        var tempArr = this.value1;
      },
      error => {
      })
  }

  check(label) {
    this.addLabelEvent.emit(label);
    this.body = {
      "noteId": this.notedetails.id,
      "lableId": label.id
    }
    this.myHttpService.postNotes('/notes/' + this.notedetails.id + '/addLabelToNotes/' + label.id + '/add',
      this.body, this.token).subscribe(
        (data) => {
          this.eventEntry.emit({});
        },
        error => {
        })
  }
}