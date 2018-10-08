import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private http: HttpClient) { }

  getData()
  {
    return [
      {
        "name": "basic",
        "description": "Ability to add only title and description"
      },
      {
        "name": "advance",
        "description": "Ability to add title, description,images,labels,checklist and colors"
      }
    ]
  }
}
