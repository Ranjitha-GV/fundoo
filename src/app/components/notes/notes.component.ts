import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Notes } from 'src/app/core/model/notes';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }
  private response = [];
  private noteCard : Notes[] = [];
  private noteId = [];
  private notePinedCard : Notes[] = [];
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
    this.httpService.notesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
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
    this.httpService.notesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        var response : Notes[] = [] = data['data']['data'];
        this.notePinedCard = [];
        for (var i = response.length - 1; i >= 0; i--) {
          if (response[i].isDeleted == false && 
            response[i].isArchived == false && response[i].isPined == true) {
            this.notePinedCard.push(response[i]);
          }
        }
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
