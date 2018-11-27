import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DialogData } from '../update/update.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DeletePopComponent } from '../delete-pop/delete-pop.component';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss']
})
export class PopOverComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public myHttpService : HttpService, public dialogRef: MatDialogRef<PopOverComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData, public dialog : MatDialog, 
    public httpService: NotesServiceService) { }
    
  ngOnInit() {
  }
/**Pop up to confirm note deletion */
  dialogOpen(note): void {
    const dialogRef = this.dialog.open(DeletePopComponent, {
    width: 'fit-content',
    height:'fit-content'
    });
    
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      if(result == true)
      {      
        var id = note.id
        this.httpService.deleteNotesForever(
          {
            "isDeleted": false,
            "noteIdList": [id]
          }).subscribe(
            (data) => {
            },
            error => {
            })
        
       }
     })
  }
/**Hitting API to recover notes from trash */
  restore(note) {
    var id = note.id
    this.httpService.trashNotes({
      "isDeleted": false,
      "noteIdList": [id]
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data) => {
      },
      error => {
      })
  }
/**Hitting API to delete note forever */
  deleteForever(note) {
    this.dialogOpen(note);
   
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
