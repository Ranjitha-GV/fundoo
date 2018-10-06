import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

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
