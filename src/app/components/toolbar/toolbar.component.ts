import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  @Input()  reminderValue;

  ngOnInit() {
  }
  token = localStorage.getItem('token');
  reminder()
  { 
    this.myHttpService.postNotes('/notes/'+this.reminderValue.id+'/addUpdateReminderNotes', {
      "title": this.reminderValue.title,
      "description": this.reminderValue.title,
      "reminder": [
        "2018-11-06T05:19:44.492Z"
      ]

    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);

      },
      error => {
        console.log("Error", error);
      }) 
  }
}
