import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ForgotFormComponent } from "./forgot-form/forgot-form.component";
import { DisplayFormComponent } from "./display-form/display-form.component";
import { UpdateFormComponent } from "./update-form/update-form.component";
import { StudRegFormComponent } from "./studreg-form/studreg-form.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent},
  { path: 'registration', component: RegistrationFormComponent},
  { path: 'forgot', component: ForgotFormComponent},
  { path: 'display', component: DisplayFormComponent, canActivate: [AuthGuard]},
  { path: 'update', component: UpdateFormComponent},
  { path: 'studreg', component: StudRegFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
