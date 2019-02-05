import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from '../app/welcome/welcome.component';
import { TopicListComponent } from '../app/topic-list/topic-list.component';
import { TopicDetailsComponent } from '../app/topic-details/topic-details.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
