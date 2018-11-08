import { Component, OnInit, Inject, Input, ElementRef, ViewChild } from '@angular/core';
import { FundooNotesComponent } from '../fundoo-notes/fundoo-notes.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/http/http.service';
import { NullAstVisitor } from '@angular/compiler';
import { SearchService } from '../../core/services/data/search.service';



@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(private myHttpService: HttpService, public dialogRef:
    MatDialogRef<FundooNotesComponent>, public data: SearchService) { }

  public show;
  value1: any = [];
  @ViewChild('newLabel') newLabel: ElementRef;
  @ViewChild('myLabel') myLabel: ElementRef;
  clear: any;
  res: string;
  id = localStorage.getItem('userId')
  token = localStorage.getItem('token');

  onNoClick(): void {
  }

  ngOnInit() {
    this.delete();
  }

  addLabel() {
    var label = this.newLabel.nativeElement.innerHTML
    for (var i = 0; i < this.value1.length; i++) {
      if (this.value1[i].label == label) {
        alert('duplicate data');
        return false;
      }
    }
    this.myHttpService.postNotes('/noteLabels', {
      "label": this.newLabel.nativeElement.innerHTML,
      "isDeleted": false,
      "userId": this.id

    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.delete();
        this.dialogRef.close();

      },
      error => {
        console.log("Error", error);
        this.dialogRef.close();
      })
  }

  labelDelete(val) {
    this.myHttpService.deleteLabel('/noteLabels/' + val + '/deleteNoteLabel', {
      "label": this.newLabel.nativeElement.innerHTML
    }).subscribe(
      (data) => {
        console.log("DELETE Request is successful ", data);
        this.data.changeChipEvent(true);
        this.delete();
      },
      error => {
        console.log("Error", error);
      })
  }

  delete() {
    let tempArr = [];
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            tempArr.push(data['data']['details'][i])
          }
        }
        this.value1 = tempArr;
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
          this.delete();
        },
        error => {
          console.log("Error", error);
        })
  }
  edit2(id) {
    this.show = id;
  }

  close() {
    this.newLabel.nativeElement.innerHTML = ' ';
  }
}
