import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { FundooNotesComponent } from './components/fundoo-notes/fundoo-notes.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { HomeComponent } from './components/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { BinComponent } from './components/bin/bin.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CollabComponent } from './components/collab/collab.component';
import { ColorComponent } from './components/color/color.component';
import { PhotoComponent } from './components/photo/photo.component';
import { ArchiveIconComponent } from './components/archive-icon/archive-icon.component';
import { MoreComponent } from './components/more/more.component';
import { MainnotesComponent } from './components/mainnotes/mainnotes.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { AddnotesComponent } from './components/addnotes/addnotes.component';
import { UpdateComponent } from './components/update/update.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LabelComponent } from './components/label/label.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';



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
    MatChipsModule


  ],
  providers: [HttpService, AuthService, AuthGuard],
  entryComponents: [UpdateComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
