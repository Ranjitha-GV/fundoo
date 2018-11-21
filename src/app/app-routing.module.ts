import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetComponent } from './components/reset/reset.component';
import { FundooNotesComponent } from './components/fundoo-notes/fundoo-notes.component';
import { HomeComponent } from './components/home/home.component';
import { NotesComponent } from './components/notes/notes.component';
import { BinComponent } from './components/bin/bin.component'
import { ArchiveComponent } from './components/archive/archive.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AuthGuard } from './core/services/authGaurd/auth.guard';
import { LabelComponent } from './components/label/label.component';
import { NewLabelComponent } from './components/new-label/new-label.component';
import { SearchComponent } from './components/search/search.component';




const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'resetpassword/:forgotToken', component: ResetComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'notes', component: NotesComponent },
      { path: 'bin', component: BinComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'label', component: LabelComponent },
      { path: 'newlabel/:labelList', component: NewLabelComponent },
      { path: 'search', component: SearchComponent },
      { path: '', redirectTo: 'notes', pathMatch: 'full' }

    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
