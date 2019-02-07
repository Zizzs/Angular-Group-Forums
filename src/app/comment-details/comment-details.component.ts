import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {

  replyIsTrue = false;
  constructor(private authService: AuthService) { }
  @Input() comment: Comment;

  ngOnInit() {
  }

  replyToComment() {
    this.replyIsTrue = true;
  }

  cancelReply() {
    this.replyIsTrue = false;
  }

}
