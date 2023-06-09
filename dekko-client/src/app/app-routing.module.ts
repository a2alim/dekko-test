import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'login'},
  {
    path: 'login',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    // resolve: {
    //   initialData: InitialDataResolver,
    // },
    // data: {applyPreload: true},
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
