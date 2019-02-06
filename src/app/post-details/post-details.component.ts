import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postTitle;
  postBody;
  postUser;
  postId;
  newComment=false;
  comments = ["1","1","1","1","1","1","1","1","1"];


  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.postTitle = params["title"];
      this.postBody = params["body"];
      this.postUser = params["user"];
      this.postId = params["id"];
    })
  }

  ngOnInit() {
  }

  openNewComment(){
    this.newComment=true;
  }

}
