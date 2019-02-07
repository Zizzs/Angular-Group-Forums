import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css']
})
export class CommentDetailsComponent implements OnInit {
  constructor() { }
  @Input() comment: Comment;

  ngOnInit() {
    console.log(`Initialized comment detail component with comment ${this.comment}`);
  }

}
