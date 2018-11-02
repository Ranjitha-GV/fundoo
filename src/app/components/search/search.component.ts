import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public myHttpService : HttpService, public data : SearchService) { }
  token = localStorage.getItem('token');
  response = [];
  noteCard = [];
  searchElement : any;

  ngOnInit() 
  {
    this.data.currentMessage.subscribe(message =>{
      this.searchElement = message;
    })
    this.getNoteCard();
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