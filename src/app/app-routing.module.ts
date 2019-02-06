import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../app/welcome/welcome.component';
import { TopicListComponent } from '../app/topic-list/topic-list.component';
import { TopicDetailsComponent } from '../app/topic-details/topic-details.component';
import { PostDetailsComponent } from '../app/post-details/post-details.component';
import { NewPostComponent } from '../app/new-post/new-post.component';
import { AuthGuard } from './guards/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome', pathMatch:'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'topics',
    component: TopicListComponent
  },
  {
    path: 'topics/:topic',
    component: TopicDetailsComponent
  },
  {
    path: 'topics/:topic/new-post',
    component: TopicDetailsComponent
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent
  },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
