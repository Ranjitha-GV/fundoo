import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css'],
  outputs:['onNewEntryAdded']

})
export class AddnotesComponent implements OnInit {

  constructor(private myHttpService: HttpService) { }
  hide : any = 0;
  token = localStorage.getItem('token');
  newObject : any;
  @Output() onNewEntryAdded = new EventEmitter();

  move()
  {
    this.hide = 1;
  }
  back()
  {
    this.hide = 0;
    this.myHttpService.postNotes('/notes/addNotes',{
      'title': document.getElementById('title').textContent,
      'description':document.getElementById('description').textContent,
      'labelIdList':'',
      'checklist':'',
      'isPined':'false'
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        //''''''''''''''''''''''''''''''''''''''''''''''//
        // addNewEntry(): void {
                 this.onNewEntryAdded.emit({
                 })
             //===========================//
  },
  error => {
    console.log("Error", error);
  })
}


  ngOnInit() {
    
  }

}
