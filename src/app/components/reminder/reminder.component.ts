import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }
  private reminderArray = [];

  ngOnInit() {
    this.reminders();
  }
  reminders() {
    this.httpService.getRemindersNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      
      this.reminderArray = data['data'].data;
      this.reminderArray.sort((a: any, b: any) =>
        new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
      );
    },
      error => {
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
