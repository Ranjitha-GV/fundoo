import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { Notes } from 'src/app/core/model/notes';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  response: any = [];
  noteCard : Notes[] = [];
  token = localStorage.getItem('token');
  noteId = [];
  notePinedCard = [];
  @Input() notedetails;

  ngOnInit() {
    this.getNoteCard();
    this.getNotes();
  }

  addNewEntry(event) {
    if (event) {
      this.getNoteCard();
      this.getNotes();
    }
  }
  modelCatch(dataNotes: Notes)
  {
    this.noteCard.splice(0,0,dataNotes);
  }

  getNoteCard() {
    this.myHttpService.getNotes('/notes/getNotesList', this.token).subscribe(
      (data) => {
        this.noteCard = [];
        var response : Notes[] = [] = data['data']['data'];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (response[i].isDeleted == false && response[i].isArchived == false 
            && response[i].isPined == false) {
            this.noteCard.push(response[i]);
          }
        }
      },
      error => {
      })
  }
  getNotes() {
    this.myHttpService.getNotes('/notes/getNotesList', this.token).subscribe(
      (data) => {
        this.notePinedCard = [];
        this.response = data['data']['data'];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && 
          data['data']['data'][i].isArchived == false && data['data']['data'][i].isPined == true) {
            this.notePinedCard.push(data['data']['data'][i]);
          }
        }
      },
      error => {
      })
  }
}
