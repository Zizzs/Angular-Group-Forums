import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() comments: Comment[];

  public sortedComments: Comment[];

  constructor() { }

  ngOnInit() {
    this.sortedComments = Comment.sortComments(this.comments);
  }

}
