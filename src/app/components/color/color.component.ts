import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private myHttpService : HttpService) { }
  token = localStorage.getItem('token');
  card =[];
  @Input() color;
  ngOnInit() {
    
}
colors(id)
{
this.myHttpService.postColor('/notes/changesColorNotes',
    {
      "color": id,
      "noteIdList": [this.color.id]
    }, this.token).subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        console.log(id);
        console.log(this.color.id);
      },
      error => {
        console.log("Error", error);
      })
  }
  }



