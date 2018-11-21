import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public httpService: NotesServiceService) { }

  private body;
  private show = 0;
  private currentDate = new Date();
  @Output() reminderEmit = new EventEmitter();
  @Output() emitReminder = new EventEmitter();
  @Input() reminderValue;


  ngOnInit() {
  }

  reminders = [
    { value: '', period: 'Morning', viewTime: '8:00 AM' },
    { value: '', period: 'Afternoon', viewTime: '1:00 PM' },
    { value: '', period: 'Evening', viewTime: '6:00 PM' },
    { value: '', period: 'Night', viewTime: '8:00 PM' }

  ]

  reminder() {
    let date1 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate(), 20, 0, 0, 0);
    this.emitReminder.emit(date1);
    this.httpService.addReminderUpdate({
      "noteIdList": [this.reminderValue.id],
      "reminder": date1

    })
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
      (data) => {
        this.reminderEmit.emit({
        })
      },
      error => {
      })
  }

  addTomReminder() {
    var date2 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 1, 8, 0, 0, 0);
    this.emitReminder.emit(date2);
    this.httpService.addReminderUpdate(
      {
        "noteIdList": [this.reminderValue.id],
        "reminder": date2
      })
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
        this.show = 1;
        this.reminderEmit.emit({
        })
      })
  }

  addWeekReminder() {
    var date3 = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
      this.currentDate.getDate() + 7, 8, 0, 0, 0);
    this.emitReminder.emit(date3);
    this.httpService.addReminderUpdate(
      {
        "noteIdList": [this.reminderValue.id],
        "reminder": date3
      })
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
        this.show = 1;
        this.reminderEmit.emit({
        })
      })
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

  customReminder(date, timing) {

    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      let date4 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0);
      this.emitReminder.emit(date4);
      this.body = {
        "noteIdList": [this.reminderValue.id],
        "reminder": date4
      }
      this.httpService.addReminderUpdate(this.body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe((data) => {

        this.reminderEmit.emit({});
      })
    } else if (timing == '1:00 PM') {
      let date5 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0);
      this.emitReminder.emit(date5);
      this.body = {
        "noteIdList": [this.reminderValue.id],
        "reminder": date5
      }
      this.httpService.addReminderUpdate(this.body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe((data) => {

        this.reminderEmit.emit({});
      })
    } else if (timing == '6:00 PM') {
      let date6 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0);
      this.emitReminder.emit(date6);
      this.body = {
        "noteIdList": [this.reminderValue.id],
        "reminder": date6
      }
      this.httpService.addReminderUpdate(this.body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe((data) => {

        this.reminderEmit.emit({})
      })
    } else if (timing == '9:00 PM') {
      let date7 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0);
      this.emitReminder.emit(date7);
      this.body = {
        "noteIdList": [this.reminderValue.id],
        "reminder": date7
      }
      this.httpService.addReminderUpdate(this.body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe((data) => {

        this.reminderEmit.emit({})
      })
    } else
      if (timing == this.reminderBody.time) {
        var x;
        var split = this.reminderBody.time.split("", 8);
        var hour = Number(split[0] + split[1]);
        var minute = Number(split[3] + split[4]);
        var ampm = (split[6] + split[7]);

        if (ampm == 'AM' || ampm == 'am') {
          var date8 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0);
          this.emitReminder.emit(date8);
          this.body = {
            "noteIdList": [this.reminderValue.id],
            "reminder": date8
          }
          this.httpService.addReminderUpdate(this.body)
          .pipe(takeUntil(this.destroy$))  
          .subscribe((data) => {

            this.reminderEmit.emit({})
          })
        }
        else if (ampm == 'PM' || ampm == 'pm') {
          let date9 = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0);
          this.emitReminder.emit(date9);
          this.body = {
            "noteIdList": [this.reminderValue.id],
            "reminder": date9
          }
          this.httpService.addReminderUpdate(this.body)
          .pipe(takeUntil(this.destroy$))  
          .subscribe((data) => {

            this.reminderEmit.emit({})
          })
        }
      }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  enter() {
    this.show = 1;
  }
  enterAfter() {
    this.show = 0;
  }

}
