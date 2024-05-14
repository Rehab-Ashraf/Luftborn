import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/users/components/login/login.component';
import { LoginActivate } from '../../sharedFeatures/services/login-activate.service';
import { SignUpComponent } from 'src/app/modules/users/components/sign-up/signup.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('src/app/modules/users/users.module').then(m => m.UsersModule),
  },


  { path: 'login', component: LoginComponent, canActivate: [LoginActivate] },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('src/app/modules/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
