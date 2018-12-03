import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndAnswerComponent } from './question-and-answer.component';

describe('QuestionAndAnswerComponent', () => {
  let component: QuestionAndAnswerComponent;
  let fixture: ComponentFixture<QuestionAndAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAndAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Like should be valid'),async(()=> {
    expect(component.like.length == 5).toBeTruthy();
    expect(component.like.length < 0).toBeFalsy();
    })

  it('Rate should be valid'),async(()=> {
      expect(component.rateValue.length == 5).toBeTruthy();
      expect(component.rateValue.length == 4).toBeTruthy();
      expect(component.rateValue.length == 3).toBeTruthy();
      expect(component.rateValue.length == 2).toBeTruthy();
      expect(component.rateValue.length == 1).toBeTruthy();
      expect(component.rateValue.length > 6).toBeFalsy();
      expect(component.rateValue.length < 4).toBeFalsy();
    })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be liked', () => {
    let like=[{
      like:Boolean,
      userId: 'sh256gds7sh'
    }]
    let id = {
      like: like
    }
    expect(component.like(id)).toBeTruthy();
  })

  it('should be liked', () => {
    let like=[{
      like: String,
      userId: 'sh256gds7sh'
    }]
    let id = {
      like: like
    }
    expect(component.like(id)).toBeFalsy();
  })

  it('should be liked', () => {
    let like=[{
      like: String,
      userId: '12324354655'
    }]
    let id = {
      like: like
    }
    expect(component.like(id)).toBeFalsy();
  })

  it('should be liked', () => {
    let like = [{
      like: Boolean,
      userId: '21342345566'
    }]
    let id = {
      like: like
    }
    expect(component.like(id)).toBeFalsy();
  })

  it('should be true', () =>
  {
    let enter = [{
      message : 'qiijqshxuusyxubnx jxhjsxhjh xjsh?',
      notesId : '62ftgfgswf6265gwsg'

    }]
    let question = {
      messageOutput : 'qiijqshxuusyxubnx jxhjsxhjh xjsh?'
    }
    expect(component.enter(question)).toBeTruthy();
  })

  it('blank message should be false', () =>
  {
    let enter = [{
      message : '',
      notesId : '62ftgfgswf6265gwsg'

    }]
    let question = {
      messageOutput : ''
    }
    expect(component.enter(question)).toBeFalsy();
  })

  it('blank message should be false', () =>
  {
    let enter = [{
      message : 'edsfv srgfrs dsfsrg',
      notesId : '62ftgfgswf6265gwsg'

    }]
    let question = {
      messageOutput : ''
    }
    expect(component.enter(question)).toBeFalsy();
  })

  it('Invalid noteId should be false', () =>
  {
    let enter = [{
      message : 'edsfv srgfrs dsfsrg',
      notesId : '124235346536'

    }]
    let question = {
      messageOutput : 'edsfv srgfrs dsfsrg'
    }
    expect(component.enter(question)).toBeFalsy();
  })


  it('Invalid message and noteId should be false', () =>
  {
    let enter = [{
      message : '',
      notesId : '124235346536'

    }]
    let question = {
      messageOutput : ''
    }
    expect(component.enter(question)).toBeFalsy();
  })


  it('Blank message and noteId should be false', () =>
  {
    let enter = [{
      message : '',
      notesId : ''

    }]
    let question = {
      messageOutput : ''
    }
    expect(component.enter(question)).toBeFalsy();
  })

  it('Rate to be true', () =>
  {
    let rateValue = [{
     rate : Boolean,
     userId : '62ghswrts6256gs'

    }]
    let param = {
      value : 5,
      event : true
    }
    expect(component.enter(param)).toBeTruthy();
  })

  it('Rate to be false', () =>
  {
    let rateValue = [{
     rate : String,
     userId : '62ghswrts6256gs'

    }]
    let param = {
      value : 5,
      event : true
    }
    expect(component.enter(param)).toBeFalsy();
  })
  it('Rate to be false', () =>
  {
    let rateValue = [{
     rate : String,
     userId : '1234253456'

    }]
    let param = {
      value : 5,
      event : true
    }
    expect(component.enter(param)).toBeFalsy();
  })

  it('Rate to be false', () =>
  {
    let rateValue = [{
     rate : String,
     userId : '34ewd234er45fd'

    }]
    let param = {
      value : 5,
      event : true
    }
    expect(component.enter(param)).toBeFalsy();
  })

  it('Rate to be false', () =>
  {
    let rateValue = [{
     rate : String,
     userId : ''

    }]
    let param = {
      value : 5,
      event : true
    }
    expect(component.enter(param)).toBeFalsy();
  })

  it('Reply to be entered', () =>
  {
    let answer = [{
     message : 'sgdf sdvghgs vdsxhgyhwsgy',
     userId : '2342erfewsf3453456'

    }]
    let param = {

        id: '276hbdsh8285rtgdrf'
    }
    expect(component.enter(param)).toBeTruthy();
  })


  it('Invalid userId is false', () =>
  {
    let answer = [{
     message : 'sdgg hsdhg shdbh',
     userId : '453546546467'

    }]
    let param = {

        id: '276hbdsh8285rtgdrf'
    }
    expect(component.enter(param)).toBeFalsy();
  })

  it('Blank message is false', () =>
  {
    let answer = [{
     message : '',
     userId : '2342erfewsf345uyuhj'

    }]
    let param = {

        id: '276hbdsh8285rtgdrf'
    }
    expect(component.enter(param)).toBeFalsy();
  })
  it('UserId cannot be blank', () =>
  {
    let answer = [{
     message : 'dfsgfgvdfgfgdf fdvbdff',
     userId : ''

    }]
    let param = {

        id: ''
    }
    expect(component.enter(param)).toBeFalsy();
  })




});
