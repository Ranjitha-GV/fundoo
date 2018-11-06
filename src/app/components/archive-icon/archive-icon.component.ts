import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.css']
})
export class ArchiveIconComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  token = localStorage.getItem('token');
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();

  ngOnInit() {
  }

  archivePost(archive) {
    this.myHttpService.postArchive('/notes/archiveNotes',
      {
        "isArchived": true,
        "noteIdList": [this.archive.id]
      }, this.token).subscribe(data => {
        console.log("Post successful", data);
        this.archiveEmit.emit({});
      },
        error => {
          console.log("Error", error);
        })
  }
}
