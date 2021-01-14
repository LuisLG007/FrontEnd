import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { AuthGuard } from './shared/guards/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'usuarios', canActivate: [AuthGuard], component: AllUsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
