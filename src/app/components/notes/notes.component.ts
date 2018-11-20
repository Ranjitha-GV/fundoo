import { Component, OnInit, Input } from '@angular/core';
import { Notes } from 'src/app/core/model/notes';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(public httpService: NotesServiceService) { }
  private response = [];
  private noteCard : Notes[] = [];
  private noteId = [];
  private notePinedCard = [];
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
    this.httpService.notesList().subscribe(
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
    this.httpService.notesList().subscribe(
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
