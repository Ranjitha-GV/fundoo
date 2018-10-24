import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';


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
  ngOnInit() {
    // this.getNoteCard();
    // this.getInterval();
  }
  
    // getInterval()
    // {
    //   this.interval = setInterval(()=>
    //   {
    //     this.getNoteCard();
    //   },1000);
    // }

}
