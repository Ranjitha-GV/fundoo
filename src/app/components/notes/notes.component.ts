import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor() { }
  hide : any = 0;
  move()
  {
    this.hide = 1;
  }
  back()
  {
    this.hide = 0;
  }
  ngOnInit() {
  }

}
