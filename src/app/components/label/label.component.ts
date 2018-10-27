import { Component, OnInit, Inject } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }

    
    onNoClick(): void {
      // this.dialogRef.close();
    }
    id = localStorage.getItem('userId')
    token = localStorage.getItem('token');
    addLabel() {
      this.myHttpService.postNotes('/noteLabels', {
        "label":document.getElementById('labelId').innerHTML,
        "isDeleted" : true,
        "userId": this.id

      }, this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          // this.onNewEntryAdded.emit({
          // })
        },
        error => {
          console.log("Error", error);
        })
    }

  ngOnInit() {
  }

}
