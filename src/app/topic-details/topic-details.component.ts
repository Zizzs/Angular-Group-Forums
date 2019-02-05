import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {
  topicTitle: string;
  topicDescription: string;

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.topicTitle = params["title"];
      this.topicDescription = params["description"];
    })
  }

  ngOnInit() {
  }

}
