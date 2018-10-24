import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  response : any = [];
  noteCard : any = [];

  ngOnInit() {

    this.getNoteCard();
  }
  token = localStorage.getItem('token');
  addNewEntry(event)
  {
    console.log(event);
    if(event)
    {
  
    this.myHttpService.getNotes('/notes/getNotesList', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.response = data['data']['data'];
          this.noteCard = this.response;
        
      },
      error => {
        console.log("Error", error);
      })
    }
  }
  
getNoteCard()
  {
    this.myHttpService.getNotes('/notes/getNotesList', this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.response = data['data']['data'];
          this.noteCard = this.response;
        
      },
      error => {
        console.log("Error", error);
      })
    }
}
