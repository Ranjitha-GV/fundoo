import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.css']
})
export class BinComponent implements OnInit {
  card = [];
  constructor(private myHttpService: HttpService, private data: SearchService) { }
  token = localStorage.getItem('token');
  toggle = true;

  ngOnInit() {
    this.delete();
    this.gridList();
  }

  delete() {
    this.myHttpService.getTrash('/notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        this.card = [];
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == true) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
        console.log("Error", error);
      })
  }

  restore(note) {
    var id = note.id
    this.myHttpService.deleteNotes('/notes/trashNotes', {
      "isDeleted": false,
      "noteIdList": [id]
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.delete();
      },
      error => {
        console.log("Error", error);
      })
  }

  deleteForever(note) {
    var id = note.id
    this.myHttpService.deleteNotes('/notes/deleteForeverNotes',
      {
        "isDeleted": false,
        "noteIdList": [id]
      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.delete();
        },
        error => {
          console.log("Error", error);
        })
  }

  gridList() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }
}


