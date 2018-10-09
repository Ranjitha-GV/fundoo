import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const appRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
    exports: [RouterModule]

})
export class AppRoutingModule {}
