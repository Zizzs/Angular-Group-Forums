import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { array } from '../mock-topics';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  topics = array;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToTopicPage(topic) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "title": topic.title,
        "description": topic.description
      }
    };
    this.router.navigate(["topics", topic.title], navigationExtras)
  }
}
