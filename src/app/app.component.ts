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
  constructor(){}

  ngOnInit(){
  }
}
