import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';


@Component({
  selector: 'app-mainnotes',
  templateUrl: './mainnotes.component.html',
  styleUrls: ['./mainnotes.component.css']
})
export class MainnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  array: any = [];
  token = localStorage.getItem('token');
  noteCard : any = [];
  response : any;
  interval : any;
  @Input() notesArray;
  @Output() addEntry = new EventEmitter();
  ngOnInit() {
    
  }
  nextEntry(event)
  {
    if(event)
    {
      this.addEntry.emit({

      })
    }
  }
}
