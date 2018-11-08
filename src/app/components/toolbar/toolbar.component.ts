import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  @Input() reminderValue;
  token = localStorage.getItem('token');
  show = 0;
  @Output() reminderEmit = new EventEmitter();
  currentDate = new Date();

  ngOnInit() {
  }

  reminder() {
    this.myHttpService.postArchive('/notes/addUpdateReminderNotes', {
      "noteIdList": [this.reminderValue.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
        this.currentDate.getDate(), 8, 0, 0, 0)

    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      })
  }

  addTomReminder() {
    this.myHttpService.postArchive('/notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminderValue.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
          this.currentDate.getDate() + 1, 8, 0, 0, 0)
      }, this.token).subscribe(data => {
        this.show = 1;
        console.log('POST is successfull ', data);
        this.reminderEmit.emit({
        })
      })
  }

  addWeekReminder() {
    this.myHttpService.postArchive('/notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminderValue.id],
        "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
          this.currentDate.getDate() + 7, 8, 0, 0, 0)
      }, this.token).subscribe(data => {
        this.show = 1;
        console.log('POST is successfull ', data);
        this.reminderEmit.emit({
        })
      })
  }
}
