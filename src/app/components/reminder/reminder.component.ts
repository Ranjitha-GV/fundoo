import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  reminderArray = [];
  token = localStorage.getItem('token');

  ngOnInit() {
    this.reminders();
  }
  reminders()
  {
    this.myHttpService.getReminders('/notes/getReminderNotesList', this.token).subscribe((data) =>
  {
      this.reminderArray = data['data'].data;
  },
error =>
{
})
  }
}
