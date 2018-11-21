import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(public httpService: NotesServiceService) { }
  private reminderArray = [];

  ngOnInit() {
    this.reminders();
  }
  reminders() {
    this.httpService.getRemindersNotes().subscribe((data) => {
      this.reminderArray = data['data'].data;
      this.reminderArray.sort((a: any, b: any) =>
        new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
      );
    },
      error => {
      })
  }
}
