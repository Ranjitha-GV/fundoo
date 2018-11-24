import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-archive-icon',
  templateUrl: './archive-icon.component.html',
  styleUrls: ['./archive-icon.component.scss']
})
export class ArchiveIconComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }
  private card = [];
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();

  ngOnInit() {
  }
/**Hitting API to get all the archived notes */
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
        // this.getArchive();
        this.archiveEmit.emit({});      },
        error => {
        })
  }
/**Hitting API to archive notes */
  archivePost(archive) {
    this.httpService.archiveNotes(
      {
        "isArchived": true,
        "noteIdList": [this.archive.id]
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.archiveEmit.emit({});
      },
        error => {
        })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
