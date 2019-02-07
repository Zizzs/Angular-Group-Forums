import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.css']
})
export class CommentReplyComponent implements OnInit {

  @Input() parent: Comment;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
  }

  makeCommentReply(body) {
    let comment = new Comment(body, this.authService.userData.displayName, this.parent.postId, Date.now(), this.parent.id);
    this.postService.createComment(comment, this.parent.postId);
  }
}


// export class Comment {
//   constructor(public body: string, 
//       public user: string, 
//       public postId: string, 
//       public parentId: string = null, 
//       public id: string = null
//        //public date: Date
//   ){