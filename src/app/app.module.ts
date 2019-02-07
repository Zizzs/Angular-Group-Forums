import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { NewPostComponent } from './new-post/new-post.component';
import { NewCommentComponent } from './new-comment/new-comment.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentSortPipe } from './comment-sort.pipe';
import { CommentReplyComponent } from './comment-reply/comment-reply.component';
import { SortByTimestampPipe } from './sort-by-timestamp.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    WelcomeComponent,
    TopicListComponent,
    TopicDetailsComponent,
    PostDetailsComponent,
    NewPostComponent,

    NewCommentComponent,
    CommentDetailsComponent,

    VerifyEmailComponent,
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    CommentListComponent,
    CommentSortPipe,
    CommentReplyComponent,
    SortByTimestampPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [PostService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
