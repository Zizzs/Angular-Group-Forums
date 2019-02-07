import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postId;
  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService) { 
    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['topic'];
    });
  }

  ngOnInit() {
  }

  makePost(title, body) {
    //console.log(this.postId);
    let post = new Post(title, body, this.authService.userData.displayName, this.postId);
    this.postService.createPost(post);
  }
}
