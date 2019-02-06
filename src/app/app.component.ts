import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';
import { Post } from './models/post.model';
import { Comment } from './models/comment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular-Group-Forums';
  constructor(private postService: PostService){}

  ngOnInit(){
    //fy4BwQ7viua0kOKXkV25
    this.postService.getTopics().subscribe((data) => {
      console.log(data);
    });
  }

  async post(){
    let post = new Post(`Posted at ${Date.now()}`, 'heck', null, 'yV5TsXLEO74NRyxR6uc0');
    let result = this.postService.createPost(post);
    console.log(await result);
  }

  async postComment(){
    let newComment = new Comment(`Posted at ${Date.now()}`, null, 'fy4BwQ7viua0kOKXkV25', 'kO7GIUojiSMy4buyOWFL');
    let result = this.postService.createComment(newComment, newComment.postId);
    console.log(await result);
  }
}
