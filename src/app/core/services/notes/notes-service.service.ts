import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  baseUrl =  environment.baseUrl;
  token = localStorage.getItem('token');
  constructor(private http: HttpService) { }

  addNotes(body) {
    let url = this.baseUrl + 'notes/addNotes';
    return this.http.postNotes(url,body);
  }

  addLabels(body) {
    let url = this.baseUrl + 'noteLabels';
    return this.http.postNotes(url,body);
  }
  getLabels() {
    let url = this.baseUrl + 'noteLabels/getNoteLabelList';
    return this.http.getNotes(url);
  }
  trashNotes(body) {
    let url = this.baseUrl + 'notes/trashNotes';
    return this.http.postArchive(url, body);
  }
  getTrashNotes() {
    let url = this.baseUrl + 'notes/getTrashNotesList';
    return this.http.getNotes(url);
  }
  getRemindersNotes()
  {
    let url = this.baseUrl + 'notes/getReminderNotesList';
    return this.http.getReminders(url);
  }
  getArchiveNotes() {
    let url = this.baseUrl + 'notes/getArchiveNotesList';
    return this.http.getNotes(url);
  }
  archiveNotes(body) {
    let url = this.baseUrl + 'notes/archiveNotes';
    return this.http.postArchive(url, body);
  }
  changeColor(body) {
    let url = this.baseUrl + 'notes/changesColorNotes';
    return this.http.postArchive(url, body);
  }
  updateNotes(body) {
    let url = this.baseUrl + 'notes/updateNotes';
    return this.http.postNotes(url,body)
  }
  deleteNoteLabels(id,body) {
    let url = this.baseUrl + 'noteLabels/' + id + '/deleteNoteLabel';
    return this.http.deleteLabel(url, body);
  }
  editLabel(val,body) {
    let url = this.baseUrl + 'noteLabels/' + val + '/updateNoteLabel';
    return this.http.postArchive(url, body);  
  }
  deleteNotesForever(body) {
    let url = this.baseUrl + 'notes/deleteForeverNotes';
    return this.http.postArchive(url, body);  
  }
  pushNotifications(body) {
    let url = this.baseUrl + 'user/registerPushToken';
    return this.http.postArchive(url, body);
  }
  removeLabelsNotes(note,label,body) {
    let url = this.baseUrl + 'notes/' + note + '/addLabelToNotes/' + label + '/remove';
    return this.http.postArchive(url, body);
  }
  deleteReminder(body) {
    let url = this.baseUrl + 'notes/removeReminderNotes';
    return this.http.postArchive(url, body);
  }
  updateChecklist(id, modifiedId,body) {
    let url = this.baseUrl + "notes/" + id + "/checklist/" + modifiedId + "/update";
    return this.http.postArchive(url, body);
  }
  addLabelsNotes(notes, label, body)
  {
    let url = this.baseUrl + 'notes/' + notes + '/addLabelToNotes/' + label + '/add';
    return this.http.postArchive(url, body);
  }
  getNotesByLabel(labelName,body) {
    let url = this.baseUrl + 'notes/getNotesListByLabel/' + labelName;
    return this.http.postArchive(url,body);
  }
  notesList() {
    let url = this.baseUrl + 'notes/getNotesList';
    return this.http.getNotes(url);
  }
  pinUnpin(body)
  {
    let url = this.baseUrl + 'notes/pinUnpinNotes';
    return this.http.postArchive(url, body);
  }
  addReminderUpdate(body) {
    let url = this.baseUrl + 'notes/addUpdateReminderNotes';
    return this.http.postArchive(url, body);
  }
  removeCheckList(data,id,body) {
    let url = this.baseUrl + "notes/" + data + "/checklist/" + id + "/remove";
    return this.http.postArchive(url, body);
  }
  addCheckListUpdate(data,body) {
    let url = this.baseUrl + "notes/" + data + "/checklist/add";
    return this.http.postArchive(url, body);
  }
  addCollabNotes(id,body)
  {
    let url = this.baseUrl + "notes/" + id + "/AddcollaboratorsNotes";
    return this.http.postArchive(url, body);
  }
}
