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

/**Delete confirmation pop over */
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
/**Delete message pop over */
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
            this.delete();
          },
          error => {
          })    });
    }
/**Hitting API to get trash notes */
  delete() {
    this.myHttpService.getTrash('/notes/getTrashNotesList', this.token).subscribe(
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
    this.myHttpService.deleteNotes('/notes/trashNotes', {
      "isDeleted": false,
      "noteIdList": [id]
    }, this.token).subscribe(
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
    this.data.currentGridEvent.subscribe(message => {
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
}


