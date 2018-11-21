import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  outputs: ['onNewEntryAdded']

})
export class MoreComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }
  private value1 = null;
  private body;
  @Input() notedetails;
  @Input() addArray;
  @Output() eventEntry = new EventEmitter();
  @Output() checkEmit = new EventEmitter();
  @Output() addLabelEvent = new EventEmitter();
  

  ngOnInit() {
  }

  delete(id) {
    this.httpService.trashNotes({
      "isDeleted": true,
      "noteIdList": [this.notedetails.id]
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.eventEntry.emit({
        })
      },
      error => {
      })
  }

  addLabel() {
    this.httpService.getLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.value1 = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            this.value1.push(data['data']['details'][i])
          }
        }
        var tempArr = this.value1;
      },
      error => {
      })
  }

  check(label) {
    this.addLabelEvent.emit(label);
    if(this.notedetails == undefined)
    {
      this.notedetails = '';
      this.body = {
        "noteId": '',
        "lableId": label.id
      }
    }
      else
      {
        this.body = {
          "noteId": this.notedetails.id,
          "lableId": label.id
      }
    }
    this.httpService.addLabelsNotes(this.notedetails.id, label.id,
      this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.eventEntry.emit({});
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