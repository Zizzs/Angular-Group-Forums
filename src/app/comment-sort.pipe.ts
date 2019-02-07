import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from './models/comment.model';

@Pipe({
  name: 'commentSort'
})
export class CommentSortPipe implements PipeTransform {

  transform(value: Comment[]): Comment[] {
    return Comment.sortComments(value);
  }

}
