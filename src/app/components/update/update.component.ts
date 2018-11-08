import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MainnotesComponent } from '../mainnotes/mainnotes.component';
import { HttpService } from '../../core/services/http/http.service';

export interface DialogData {
  title: string;
  description: string;
  id: string;
  label: string;
}

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MainnotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private myHttpService: HttpService) { }

  token = localStorage.getItem('token');
  @Input() notedetails;
  @Input() label;

  onNoClick(id): void {
    this.myHttpService.noteUpdate('/notes/updateNotes', {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('descriptionId').innerHTML

    }, this.token).subscribe(data => {
      console.log('response', data);
      this.dialogRef.close();
    })
    this.dialogRef.close();
  }

  remove(label) {
    this.myHttpService.postNotes('/notes/' + this.data.id + '/addLabelToNotes/' + label + '/remove',
      {
        "noteId": this.data.id,
        "lableId": label
      },
      this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);

        },
        error => {
          console.log("Error", error);
        })
  }

  ngOnInit() {
  }

}
