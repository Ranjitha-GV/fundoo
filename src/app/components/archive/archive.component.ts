import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { SearchService } from '../../core/services/data/search.service';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public data: SearchService, public httpService: NotesServiceService) { }
  private card = [];
  private toggle = true;
  @Input() noteDetails;
  @Output() addEntry = new EventEmitter();

  ngOnInit() {
    this.gridList();
    this.getArchive();
  }
/**Hitting API to get archive notes*/
  getArchive() {
    this.httpService.getArchiveNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.card = [];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isArchived == true 
            && data['data']['data'][i].isDeleted == false) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
      })
  }
/**Hitting API to unarchive notes */
  unarchive(note) {
    this.httpService.archiveNotes(
      {
        "isArchived": false,
        "noteIdList": [note]
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.getArchive();
      },
        error => {
        })
  }
/**To toggle CSS for grid and list in archive component */
  gridList() {
    this.data.currentGridEvent
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
    })
  }
  addNewEntry()
  {
    this.getArchive();
  }
/**Event emitter*/
  nextEntry(event) {
    if (event) {
      this.getArchive();
    }
  }
/**To change status of checklist*/
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    // this.modifiedList = checkList;
    // this.updatelist(note.id);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


