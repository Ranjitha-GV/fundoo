import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionAndAnswerService {

  private baseUrl = environment.baseUrl;
  constructor(public http: HttpService) { }

  sendNoteDetails(noteId)
  {
    let url = this.baseUrl + "notes/getNotesDetail/" + noteId;
    return this.http.getNotes(url);
  }
  addQuestion(body)
  {
    let url = this.baseUrl + "questionAndAnswerNotes/addQuestionAndAnswer";
    return this.http.postArchive(url, body);
  }
}
