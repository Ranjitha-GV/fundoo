import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(private myHttpService: HttpService, private data : SearchService) { }
  card = [];
  toggle = true;
  @Output() addEntry = new EventEmitter();
  token = localStorage.getItem('token');
  ngOnInit() {
    this.gridList();
    this.getArchive();
    
  }
  getArchive()
  {
    this.myHttpService.getTrash('/notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        this.card = [];
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isArchived == true && data['data']['data'][i].isDeleted == false) {
          this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
        console.log("Error", error);
      })
  }
  unarchive(note)
  {
    // var id = note.id
    console.log(note);
    this.myHttpService.postArchive('/notes/archiveNotes',
      {
        "isArchived": false,
        "noteIdList": [note]
      }, this.token).subscribe(data => {
        console.log("Post successful", data);
        this.getArchive();
      },
        error => {
          console.log("Error", error);
        })
  }
  gridList()
  {
    this.data.currentGridEvent.subscribe(message =>{
      console.log('i am in grid');
      console.log(message);
     this.toggle = message;
    })
  }
  nextEntry(event)
  {
    if(event)
    {
      this.getArchive();
    }
  }
}


