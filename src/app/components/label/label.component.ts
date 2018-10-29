import { Component, OnInit, Inject, Input } from '@angular/core';
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

    @Input() value;
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
    labelDelete() {
      this.myHttpService.deleteLabel('/noteLabels/{id}/deleteNoteLabel', {
        "label":document.getElementById('labelId').innerHTML
      }).subscribe(
        (data) => {
          console.log("DELETE Request is successful ", data);
          // this.onNewEntryAdded.emit({
          // })
        },
        error => {
          console.log("Error", error);
        })
    }

  ngOnInit() 
  {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
//         for(var i = 0; i < data['data'].length; i++ )
// {
//   if(data['data'][i].isDeleted == false)
//   {
//     this.value.push(data['data'][i].details);
//   }
// }
        this.value = data['data'].details;
        console.log(this.value);
      },
      error => {
        console.log("Error", error);
      })
  }
  

}