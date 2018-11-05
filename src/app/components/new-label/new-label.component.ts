import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-new-label',
  templateUrl: './new-label.component.html',
  styleUrls: ['./new-label.component.css']
})
export class NewLabelComponent implements OnInit {

  constructor( private route : ActivatedRoute, private myHttpService : HttpService) { }

  labelArray = [];
  labelList;

  ngOnInit() 
  {
    console.log('I am in new-label');
    this.route.params.subscribe(
      (params:Params) => {
        this.labelList = params['labelList'];
        this.getLabel(this.labelList);

      }
    )
  }
  token  =  localStorage.getItem('token');
  getLabel(labelList)
  {
    console.log(labelList);
    this.myHttpService.postNotes('/notes/getNotesListByLabel/'+ labelList,{}, this.token)
    .subscribe(
      (data) => {
        console.log("POST Request is successful ", data);
        this.labelArray = data['data'].data;
        console.log(this.labelArray);
        
      },
      error => {
        console.log("Error", error);
      })
  }

}
