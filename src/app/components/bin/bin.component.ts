import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { SearchService } from '../../core/services/data/search.service';
import { EventEmitter } from 'events';
import { PopOverComponent } from '../pop-over/pop-over.component';
import { MatDialog } from '@angular/material';
import { DeletePopComponent } from '../delete-pop/delete-pop.component';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private card = [];
  constructor(public data: SearchService, public dialog : MatDialog, 
    public httpService: NotesServiceService) { }

   private toggle = true;
   private modifiedList;
   @Output() getTrashList = new EventEmitter();
  

  ngOnInit() {
    this.delete();
    this.gridList();
  }

/**Delete confirmation pop over */
openDialog(note): void {
  const dialogRef = this.dialog.open(PopOverComponent, {
  width: 'fit-content',
  height:'fit-content',
  data: note
  });
  
  dialogRef.afterClosed()
  .pipe(takeUntil(this.destroy$))
  .subscribe(result => {
    this.delete();
  });
  }
/**Delete message pop over */
  openDeleteDialog(note): void {
    const dialogRef = this.dialog.open(DeletePopComponent, {
    width: 'fit-content',
    height:'fit-content',
    data: note
    });
    
    dialogRef.afterClosed().subscribe(result => {
      var id = note.id
      this.httpService.deleteNotesForever(
        {
          "isDeleted": false,
          "noteIdList": [id]
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.delete();
          },
          error => {
          })    });
    }
/**Hitting API to get trash notes */
  delete() {
    this.httpService.getTrashNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.card = [];
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == true) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
    })
  }
/**Hitting API to restore trash notes */
  restore(note) {
    var id = note.id
    this.httpService.trashNotes({
      "isDeleted": false,
      "noteIdList": [id]
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
        this.delete();
      },
      error => {
      })
  }
/**API call to hit delete forever API */
  deleteForever(note) {
    this.openDeleteDialog(note);
  }
/**Event emission for grid and list view */
  gridList() {
    this.data.currentGridEvent
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
    })
  }
/**Checking status of the checklist */
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedList = checkList;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}


