import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  @Input() reminderValue;
  token = localStorage.getItem('token');
  body;
  show = 0;
  @Output() reminderEmit = new EventEmitter();
  currentDate = new Date();

  ngOnInit() {
  }

  reminders = [
    { value: '', period: 'Morning', viewTime: '8:00 AM'},
    { value: '', period: 'Afternoon', viewTime: '1:00 PM'},
    { value: '', period: 'Evening', viewTime: '6:00 PM'},
    { value: '', period: 'Night', viewTime: '8:00 PM'}

  ]

  

  reminder() {
    this.myHttpService.postArchive('/notes/addUpdateReminderNotes', {
      "noteIdList": [this.reminderValue.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
        this.currentDate.getDate(), 8, 0, 0, 0)

    }, this.token).subscribe(
      (data) => {
        this.reminderEmit.emit({
        })
      },
      error => {
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
        this.reminderEmit.emit({
        })
      })
  }
  reminderBody={
    "date": new FormControl(new Date()),
    "time":""
  }

  customReminder(date,timing){
    
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    
    // if(timing=='8:00 AM'){
    //   this.body = {
    //     "noteIdList": [this.reminderValue.id],
    //     "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
    //   }
    //   this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
       
    //     this.reminderEmit.emit({});
    //   })
    // }else if(timing=='1:00 PM'){
    //   this.body = {
    //     "noteIdList": [this.reminderValue.id],
    //     "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
    //   }
    //   this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
        
    //     this.reminderEmit.emit({});
    //   })
    // }else if(timing=='6:00 PM'){
    //   this.body = {
    //     "noteIdList": [this.reminderValue.id],
    //     "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
    //   }
    //   this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
       
    //     this.reminderEmit.emit({})
    //   })
    // }else if(timing=='9:00 PM'){
    //   this.body = {
    //     "noteIdList": [this.reminderValue.id],
    //     "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
    //   }
    //   this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
        
    //     this.reminderEmit.emit({})
    //   })
    // }else 
    // if(timing==this.reminderBody.time){
      var x;
      var splitTime=this.reminderBody.time.split("",8);
      var hour= Number(splitTime[0]+splitTime[1]);
      var minute= Number(splitTime[3]+splitTime[4]);
      var ampm = (splitTime[6]+splitTime[7]);
     
      if(ampm=='AM' || ampm=='am'){
        this.body = {
          "noteIdList": [this.reminderValue.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        }
        this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
          
          this.reminderEmit.emit({})
        })
      }else if(ampm=='PM' || ampm=='pm'){
        this.body = {
          "noteIdList": [this.reminderValue.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour+12, minute, 0, 0)
        }
        this.myHttpService.postArchive('/notes/addUpdateReminderNotes', this.body, this.token).subscribe((data) => {
        
          this.reminderEmit.emit({})
        })
      }     
    }
  // }


  enter()
  {
  this.show = 1;
  }
  enterAfter()
  {
    this.show = 0;
  }

}
