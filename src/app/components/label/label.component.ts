import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../services/http.service';
import { NullAstVisitor } from '@angular/compiler';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  public show;

  constructor(private myHttpService: HttpService) { }

  value1: any = [];
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  clear : any;

  onNoClick(): void {
  }
  ngOnInit() {
    this.delete();
  }
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token');
  addLabel() {
    this.myHttpService.postNotes('/noteLabels', {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
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
  labelDelete(val) {
    this.myHttpService.deleteLabel('/noteLabels/' + val + '/deleteNoteLabel', {
      "label": this.newLabel.nativeElement.innerHTML
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
  delete() {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            this.value1.push(data['data']['details'][i])
          }
        }
        console.log(this.value1);
      },
      error => {
        console.log("Error", error);
      })
  }
  edit(val) {
    this.myHttpService.postNotes('/noteLabels/' + val + '/updateNoteLabel',
      {
        "label": this.myLabel.nativeElement.innerHTML,
        "isDeleted": false,
        "id": val,
        "userId": localStorage.getItem('userId')
      },
      this.token).subscribe(
        (data) => {
          console.log("UPDATE Request is successful ", data);
          console.log(data);
        },
        error => {
          console.log("Error", error);
        })
  }
  edit2(id) {
    this.show = id;
  }

  close()
  {
     this.newLabel.nativeElement.innerHTML = ' ';
  }
}