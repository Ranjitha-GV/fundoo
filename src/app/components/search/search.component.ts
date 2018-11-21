import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { SearchService } from '../../core/services/data/search.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public myHttpService: HttpService, public data: SearchService, 
    public httpService: NotesServiceService) { }
  
  private response = [];
  private noteCard = [];
  private searchElement;

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.searchElement = message;
    })
    this.getNoteCard();
  }

  getNoteCard() {
    this.httpService.notesList().subscribe(
      (data) => {
        this.noteCard = [];
        this.response = data['data']['data'];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == false && data['data']['data'][i].isArchived == false) {
            this.noteCard.push(data['data']['data'][i]);
          }
        }
      },
      error => {
      })
  }
}
