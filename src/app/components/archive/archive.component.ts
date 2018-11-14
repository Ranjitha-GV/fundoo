import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { SearchService } from '../../core/services/data/search.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  constructor(private myHttpService: HttpService, private data: SearchService) { }
  card = [];
  toggle = true;
  @Input() noteDetails;
  @Output() addEntry = new EventEmitter();
  token = localStorage.getItem('token');

  ngOnInit() {
    this.gridList();
    this.getArchive();
  }

  getArchive() {
    this.myHttpService.getTrash('/notes/getArchiveNotesList', this.token).subscribe(
      (data) => {
        this.card = [];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isArchived == true && data['data']['data'][i].isDeleted == false) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
      })
  }
  unarchive(note) {
    this.myHttpService.postArchive('/notes/archiveNotes',
      {
        "isArchived": false,
        "noteIdList": [note]
      }, this.token).subscribe(data => {
        this.getArchive();
      },
        error => {
        })
  }
  gridList() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }
  nextEntry(event) {
    if (event) {
      this.getArchive();
    }
  }
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    // this.modifiedCheckList = checkList;
    // this.updatelist(note.id);
  }

}


