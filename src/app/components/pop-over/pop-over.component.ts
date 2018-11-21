import { Component, OnInit, Inject } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { DialogData } from '../update/update.component';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { DeletePopComponent } from '../delete-pop/delete-pop.component';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';

@Component({
  selector: 'app-pop-over',
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss']
})
export class PopOverComponent implements OnInit {

  constructor(public myHttpService : HttpService, public dialogRef: MatDialogRef<PopOverComponent>,
    @Inject(MAT_DIALOG_DATA) public data : DialogData, public dialog : MatDialog, 
    public httpService: NotesServiceService) { }
    
  ngOnInit() {
  }

  dialogOpen(note): void {
    const dialogRef = this.dialog.open(DeletePopComponent, {
    width: 'fit-content',
    height:'fit-content'
    });
    
    dialogRef.afterClosed().subscribe(result => {
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
  restore(note) {
    var id = note.id
    this.httpService.trashNotes({
      "isDeleted": false,
      "noteIdList": [id]
    }).subscribe(
      (data) => {
      },
      error => {
      })
  }

  deleteForever(note) {
    this.dialogOpen(note);
   
  }
}
