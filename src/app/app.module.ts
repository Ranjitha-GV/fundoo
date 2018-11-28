import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, 
MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule, MatExpansionModule,
MatTooltipModule, MatDialogModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, 
MatNativeDateModule, MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpService } from './core/services/http/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { FundooNotesComponent } from './components/fundoo-notes/fundoo-notes.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { BinComponent } from './components/bin/bin.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CollabComponent } from './components/collab/collab.component';
import { ColorComponent } from './components/color/color.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ArchiveIconComponent } from './components/archive-icon/archive-icon.component';
import { MoreComponent } from './components/more/more.component';
import { MainnotesComponent } from './components/mainnotes/mainnotes.component';
import { AuthService } from './core/services/authGaurd/auth.service';
import { AuthGuard } from './core/services/authGaurd/auth.guard';
import { AddnotesComponent } from './components/addnotes/addnotes.component';
import { UpdateComponent } from './components/update/update.component';
import { LabelComponent } from './components/label/label.component';
import { NewLabelComponent } from './components/new-label/new-label.component';
import { SearchPipe } from '../app/core/pipe/search.pipe';
import { SearchComponent } from './components/search/search.component';
import { LoggerService } from '../app/core/services/logger/logger.service';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PopOverComponent } from './components/pop-over/pop-over.component';
import { LabelpopComponent } from './components/labelpop/labelpop.component';
import { DeletePopComponent } from './components/delete-pop/delete-pop.component';
import { PinComponent } from './components/pin/pin.component';
import { MessagingService } from './core/services/messaging/messaging.service';
import { UsersService } from './core/services/users/users.service';
import { NotesServiceService } from './core/services/notes/notes-service.service';
import { InterceptService } from './core/services/Interceptor/intercept.service'
import { ErrorsHandler } from './core/services/errorHandling/errors-handler';
import { CollaberatorComponent } from './components/collaberator/collaberator.component';
import { QuestionAndAnswerComponent } from './components/question-and-answer/question-and-answer.component';
import { QuestionAndAnswerService } from './core/services/questionAndAnswer/question-and-answer.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    ResetComponent,
    FundooNotesComponent,
    HomeComponent,
    NotesComponent,
    ReminderComponent,
    BinComponent,
    ArchiveComponent,
    ToolbarComponent,
    CollabComponent,
    ColorComponent,
    PhotoComponent,
    ArchiveIconComponent,
    MoreComponent,
    MainnotesComponent,
    AddnotesComponent,
    UpdateComponent,
    LabelComponent,
    NewLabelComponent,
    SearchPipe,
    SearchComponent,
    CropImageComponent,
    PopOverComponent,
    LabelpopComponent,
    DeletePopComponent,
    PinComponent,
    CollaberatorComponent,
    QuestionAndAnswerComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [HttpService, AuthService, AuthGuard, LoggerService, MessagingService, UsersService,
    NotesServiceService, QuestionAndAnswerService, InterceptService,{ provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true }, {
        provide: ErrorHandler,
        useClass: ErrorsHandler,
      }],
  entryComponents: [UpdateComponent, CropImageComponent, PopOverComponent, 
  LabelpopComponent, DeletePopComponent, CollaberatorComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }