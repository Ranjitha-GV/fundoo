import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  response: any = [];
  noteCard: any = [];

  ngOnInit() 
  {
    this.getNoteCard();
  }
  token = localStorage.getItem('token');
  noteId = [];
  addNewEntry(event) {
    console.log(event);
    if (event) {
      this.getNoteCard();   
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

  getNoteCard() {
    this.myHttpService.getNotes('/notes/getNotesList', this.token).subscribe(
      (data) => {
        this.noteCard = [];
        console.log("POST Request is successful ", data);
        this.response = data['data']['data'];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.noteCard.push(data['data']['data'][i]);
          }
        }
        console.log(this.noteCard);
      },
      error => {
        console.log("Error", error);
      })
  }
}
