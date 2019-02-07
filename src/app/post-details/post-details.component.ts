import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  public post: Post;
  public comments: Comment[];


  constructor(private route: ActivatedRoute, private postService: PostService) { 
    this.route.params.forEach((urlParameters) => {
      let postId = urlParameters['id'];
      this.postService.getPost(postId).subscribe((post) => {
        this.post = post;
      });
      this.postService.getComments(postId).subscribe((comments) => {
        // console.table(comments);
        let sorted = Comment.sortComments(comments);
        this.comments = sorted;
        // console.table(sorted);
        // debugger;
      });
    });
  }

  ngOnInit() {
  }

  openNewComment(){
    // this.newComment=true;
  }

}
