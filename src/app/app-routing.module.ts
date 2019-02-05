import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../app/welcome/welcome.component';
import { TopicListComponent } from '../app/topic-list/topic-list.component';
import { TopicDetailsComponent } from '../app/topic-details/topic-details.component';
import { PostDetailsComponent } from '../app/post-details/post-details.component';
import { NewPostComponent } from '../app/new-post/new-post.component';


const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
