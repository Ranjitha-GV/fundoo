import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { SearchService } from '../../core/services/data/search.service';
import { EventEmitter } from 'events';
import { PopOverComponent } from '../pop-over/pop-over.component';
import { MatDialog } from '@angular/material';
import { DeletePopComponent } from '../delete-pop/delete-pop.component';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements OnInit {
  card = [];
  constructor(private myHttpService: HttpService, private data: SearchService,
  public dialog : MatDialog) { }
  token = localStorage.getItem('token');
  @Output() getTrashList = new EventEmitter();
  toggle = true;
  public modifiedList;

  ngOnInit() {
    this.delete();
    this.gridList();
  }


openDialog(note): void {
  const dialogRef = this.dialog.open(PopOverComponent, {
  width: 'fit-content',
  height:'fit-content',
  data: note
  });
  
  dialogRef.afterClosed().subscribe(result => {
    this.delete();
  });
  }

  openDeleteDialog(note): void {
    const dialogRef = this.dialog.open(DeletePopComponent, {
    width: 'fit-content',
    height:'fit-content',
    data: note
    });
    
    dialogRef.afterClosed().subscribe(result => {
      var id = note.id
      this.myHttpService.deleteNotes('/notes/deleteForeverNotes',
        {
          "isDeleted": false,
          "noteIdList": [id]
        }, this.token).subscribe(
          (data) => {
            console.log("POST Request is successful ", data);
            this.delete();
          },
          error => {
            console.log("Error", error);
          })    });
    }

  delete() {
    this.myHttpService.getTrash('/notes/getTrashNotesList', this.token).subscribe(
      (data) => {
        this.card = [];
        console.log("GET Request is successful ", data);
        for (var i = data['data']['data'].length - 1; i >= 0; i--) {
          if (data['data']['data'][i].isDeleted == true) {
            this.card.push(data['data']['data'][i]);
          }
        }
      },
      error => {
        console.log("Error", error);
      })
  }

  restore(note) {
    var id = note.id
    this.myHttpService.deleteNotes('/notes/trashNotes', {
      "isDeleted": false,
      "noteIdList": [id]
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.delete();
      },
      error => {
        console.log("Error", error);
      })
  }

  deleteForever(note) {
    this.openDeleteDialog(note);
  }

  gridList() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedList = checkList;
    // this.update(note.id);

  }
}


