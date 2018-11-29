import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/core/services/notes/notes-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { QuestionAndAnswerService } from 'src/app/core/services/questionAndAnswer/question-and-answer.service';

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.scss']
})
export class QuestionAndAnswerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public newHttpService: QuestionAndAnswerService, public router: Router) { }
  private url = this.router.url;
  private noteId = this.url.split('/');
  private response;
  private title;
  private description;
  private question;
  private messageOutput;
  private liked = false;
  private userId;
  private count = 0;
  private id;
  private questionId;
  private replyMessage;
  private repliesArray = [];
  private replyVal = 0;
  private firstname = localStorage.getItem('firstname');
  private lastname = localStorage.getItem('lastname');

  ngOnInit() {
    this.getNoteDetails();
  }
  /**Hitting API to get notedetails */
  getNoteDetails()
  {
    this.newHttpService.sendNoteDetails(this.noteId[3])
    .pipe(takeUntil(this.destroy$))
    .subscribe((data)=>
    {
      
      this.response = data['data']['data'][0]
      this.title = this.response.title;
      this.description = this.response.description;
      this.userId = this.response.userId;
      this.id = this.response.id;
      if(this.response.questionAndAnswerNotes[0] != undefined)
      {
        this.messageOutput = this.response.questionAndAnswerNotes[0].message;
        this.repliesArray = this.response.questionAndAnswerNotes;
      }   
    },
    error =>
    {})
  }
  /**Enter keydown function */
  enter(question)
  {
    this.newHttpService.addQuestion(
      {
        'message': question,
        'notesId': this.noteId[3]
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>
    {
      this.messageOutput = data['data']['details'].message;
    },
    error =>
    {     })
  }
  /**Function for like */
  like()
  {
    this.liked = !this.liked;
    console.log('in like',this.liked);
    let id = this.response.questionAndAnswerNotes[0].id;
    this.newHttpService.like(id,
      {
        'like': this.liked
      }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>
    {
      LoggerService.log('i am liked', data);
    },
    error =>
    {
      LoggerService.log('i am not liked', error);
    })
    this.count++
  }
  /**Hitting API to reply */
  answer(reply)
  {
    let id = this.response.questionAndAnswerNotes[0].id;
    this.newHttpService.addAnswer(id,
      {
        'message': reply,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data)=>
    {
      console.log('I am reply data', data);
      this.replyMessage = data['data']['details'].message;
    },
    error =>
    {  
      console.log('I am reply error', error);
    })
  }
  /**Function to show reply section */
  replyShow()
  {
    this.replyVal = 1;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
