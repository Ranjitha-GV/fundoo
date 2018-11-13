import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { SearchService } from '../../core/services/data/search.service';
import { LoggerService } from '../../core/services/logger/logger.service';


@Component({
  selector: 'app-mainnotes',
  templateUrl: './mainnotes.component.html',
  styleUrls: ['./mainnotes.component.scss']
})
export class MainnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService, public dialog: MatDialog, public data: SearchService) {
    this.data.currentChipEvent.subscribe(
      message => {
        if (message) {
          this.addEntry.emit({
          })
        }
      })
  }
  array: any = [];
  public modifiedList;
  token = localStorage.getItem('token');
  noteCard: any = [];
  response: any;
  interval: any;
  toggle = true;
  notesPinedCard = [];
  show = 0;
  notesCards = [];
  @Input() searchElement;
  @Input() notesArray;
  @Output() addEntry = new EventEmitter();

  ngOnInit() {
    this.getlabels();
    this.gridList();
  }

  nextEntry(event) {
    if (event) {
      this.addEntry.emit({

      })
    }
  }

  gridList() {
    this.data.currentGridEvent.subscribe(message => {
      this.toggle = message;
    })
  }

  openUpdateNotes(note): void {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '800',
      height: 'fit-content',
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.addEntry.emit({});
    });
  }

  remove(label, note) {
    this.myHttpService.postNotes('/notes/' + note + '/addLabelToNotes/' + label + '/remove',
      {
        "noteId": note,
        "lableId": label
      },
      this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.addEntry.emit({});
        },
        error => {
          console.log("Error", error);
        })
  }

  getlabels() {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        var value1 = [];
        console.log("GET Request is successful ", data);
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            value1.push(data['data']['details'][i])
          }
        }
        this.addEntry.emit({
        })
      },
      error => {
        console.log("Error", error);
      })
  }
  reminderDelete(note) {
    var id = note.id;
    LoggerService.log('reminder note id is', id);
    this.myHttpService.postArchive('/notes/removeReminderNotes',
      {
        "noteIdList": [id]
      },
      this.token).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.addEntry.emit({});
        },
        error => {
          console.log("Error", error);
        })
  }
  update(id) {
    var apiData = {
      "itemName": this.modifiedList.itemName,
      "status": this.modifiedList.status
    }
    var url = "/notes/" + id + "/checklist/" + this.modifiedList.id + "/update";
    this.myHttpService.postColor(url, JSON.stringify(apiData), this.token).subscribe(response => {
      console.log(response);
      // this.archiveEvent.emit();

    })
  }
  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.modifiedList = checkList;
    this.update(note.id);

  }
  // pin(id) {
  //   this.show = 1;
  //   this.myHttpService.postArchive('/notes/pinUnpinNotes',
  //     {
  //       "noteIdList": [id],
  //       "isPined": true
  //     },
  //     this.token).subscribe(
  //       (data) => {
  //         console.log("POST pin Request is successful ", data);
  //         this.addEntry.emit({});

  //       },
  //       error => {
  //         console.log("Error", error);
  //       })
  // }

  // unPin(id)
  // {
  //   this.myHttpService.postArchive('/notes/pinUnpinNotes',
  //     {
  //       "noteIdList": [id],
  //       "isPined": false
  //     },
  //     this.token).subscribe(
  //       (data) => {
  //         console.log("POST unpin Request is successful ", data);
  //         this.show = 0;
  //         this.addEntry.emit({});

  //       },
  //       error => {
  //         console.log("Error", error);
  //       })
  // }
}
