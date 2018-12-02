import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/core/services/logger/logger.service';
import { QuestionAndAnswerService } from 'src/app/core/services/questionAndAnswer/question-and-answer.service';
import { environment } from 'src/environments/environment.prod';

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
  private id;
  private questionId;
  private replyMessage;
  private repliesArray = [];
  private replyVal = 0;
  private img;
  private image;
  private array = [];
  private newArray = [];
  private value;
  private rateArray;
  private avgRating;
  private showing = 1;
  private show = false;
  private firstname = localStorage.getItem('firstname');
  private lastname = localStorage.getItem('lastname');
  @Output() onNewEntryAdded = new EventEmitter();

  ngOnInit() {
    this.getNoteDetails();
  }
  /**Hitting API to get notedetails */
  getNoteDetails() {
    this.newHttpService.sendNoteDetails(this.noteId[3])
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {

        this.response = data['data']['data'][0]
        this.title = this.response.title;
        this.description = this.response.description;
        this.userId = this.response.userId;
        this.id = this.response.id;
        this.img = environment.apiUrl;
        if (this.response.questionAndAnswerNotes[0].length != 0) {
          this.messageOutput = this.response.questionAndAnswerNotes[0].message;
          this.repliesArray = this.response.questionAndAnswerNotes;
          this.array = this.response.questionAndAnswerNotes[0];
        }
        if (this.response.questionAndAnswerNotes[0].rate != 0
          && this.response.questionAndAnswerNotes[0].rate != null) {
          this.newArray = this.response.questionAndAnswerNotes[0].rate;
          this.rateArray = this.response.questionAndAnswerNotes[0].rate[0].rate;
        }

        if (this.response.questionAndAnswerNotes[0].user != 0
          && this.response.questionAndAnswerNotes[0].user != null) {
          this.image = environment.apiUrl + this.response.questionAndAnswerNotes[0].user.imageUrl;
        }

      },
        error => { })
  }
  /**Enter keydown function */
  enter(question) {
    this.newHttpService.addQuestion(
      {
        'message': question,
        'notesId': this.noteId[3]
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.messageOutput = data['data']['details'].message;
        this.onNewEntryAdded.emit({});
      },
        error => { })
  }
  /**Function for like */
  like(id) {
    this.liked = !this.liked;
    console.log('in like', this.liked);
    // let id = this.response.questionAndAnswerNotes[0].id;
    this.newHttpService.like(id,
      {
        'like': this.liked
      }
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        LoggerService.log('i am liked', data);
        this.onNewEntryAdded.emit({});
      },
        error => {
          LoggerService.log('i am not liked', error);
        })
  }
  /**Hitting API to reply */
  answer(reply, id) {
    // let id = this.response.questionAndAnswerNotes[0].id;
    this.newHttpService.addAnswer(id,
      {
        'message': reply,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('I am reply data', data);
        this.replyMessage = data['data']['details'].message;
      },
        error => {
          console.log('I am reply error', error);
        })
  }
  /**Function to show reply section */
  replyShow() {
    this.replyVal = 1;
  }
  /**Hitting API to rate */
  rateValue(value, event) {
    this.newHttpService.rating(value.id,
      {
        'rate': event,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('I am rate data', data);
      },
        error => {
          console.log('I am rate error', error);
        })
  }
  /**Calculate rating */
  averageRating(rateArray) {
    this.value = 0;
    if (rateArray.length != 0) {
      for (let i = 0; i < rateArray.length; i++) {
        this.value += rateArray[i].rate
      }
      this.avgRating = this.value / rateArray.length;
      return this.avgRating;
    }
  }
  hideReplies() {
    this.show = !this.show;
    this.showing = 1;
  }
  viewReplies() {
    this.show = !this.show;
    this.showing = 0;
  }
  /**Close button functionality */
  close() {
    this.router.navigate(['/home/notes']);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
