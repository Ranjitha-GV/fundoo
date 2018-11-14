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
          this.addEntry.emit({});
        },
        error => {
        })
  }

  getlabels() {
    this.myHttpService.getNotes('/noteLabels/getNoteLabelList', this.token).subscribe(
      (data) => {
        var value1 = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            value1.push(data['data']['details'][i])
          }
        }
        this.addEntry.emit({
        })
      },
      error => {
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
          this.addEntry.emit({});
        },
        error => {
        })
  }
  update(id) {
    var apiData = {
      "itemName": this.modifiedList.itemName,
      "status": this.modifiedList.status
    }
    var url = "/notes/" + id + "/checklist/" + this.modifiedList.id + "/update";
    this.myHttpService.postColor(url, JSON.stringify(apiData), this.token).subscribe(response => {

    })
  }
  checkBox(checkList, note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.modifiedList = checkList;
    this.update(note.id);

  }
}
