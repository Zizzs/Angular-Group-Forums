import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { array } from '../mock-topics';
import { PostService } from '../services/post.service';
import { Topic } from '../models/topic.model';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics: Topic[];
  constructor(private router: Router, private postService: PostService) {}

  ngOnInit() {
    this.postService.getTopics().subscribe((topics) => {
      this.topics = topics;
    });
  }

  goToTopicPage(topic) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "title": topic.title,
        "description": topic.description
      }
    };
    this.router.navigate(["topics", topic.id]);
  }
}
