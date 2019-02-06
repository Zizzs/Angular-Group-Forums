import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { postsImport } from '../mock-posts';
import { Location } from '@angular/common';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Topic } from '../models/topic.model';


@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topicTitle: string;
  topicDescription: string;
  topicId;
  topic: Topic;

  posts: Post[];
  newThread = false;

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostService) { 
    this.route.params.forEach((urlParameters) => {
      this.topicId = urlParameters['topic'];
      this.postService.getPosts(this.topicId).subscribe((posts) => {
        this.posts = posts;
      });
      this.postService.getTopic(this.topicId).subscribe((topic) => {
        this.topic = topic;
      })
    });
  }

  ngOnInit() {
  }

  goToPostDetailPage(post) {
    this.router.navigate(["post", post.id]);
  }
  
  openNewThread(){
    this.newThread = true;
  }

}
