import { Component, OnInit } from '@angular/core';
import { MessagingService } from './core/services/messaging/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fundoo';

  constructor(private message : MessagingService) {
  }
  
  ngOnInit() {
    
    this.message.getPermission();   
  }   
}
         