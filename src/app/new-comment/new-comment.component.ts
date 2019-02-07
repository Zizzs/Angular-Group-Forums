import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { Comment } from "../models/comment.model";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  @Input() post: Post;
  postId;

  constructor(private route: ActivatedRoute, private authService: AuthService, private postService: PostService) { 
    // this.route.params.forEach((urlParameters) => {
    //   this.postId = urlParameters['id'];
    // });
  }

  ngOnInit() {
  }

  makeComment(body) {
    let comment = new Comment(body, this.authService.userData.displayName, this.post.id);
    this.postService.createComment(comment, this.post.id);
  }
}


// export class Comment {
//   constructor(public body: string, 
//       public user: string, 
//       public postId: string, 
//       public parentId: string = null, 
//       public id: string = null
//        //public date: Date
//   ){}
     