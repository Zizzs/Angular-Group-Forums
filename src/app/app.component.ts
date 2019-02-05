import { Component, OnInit } from '@angular/core';
import { PostService } from './services/post.service';

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
    this.postService.getComments('fy4BwQ7viua0kOKXkV25').subscribe((data) => {
      console.log(data);
    });
  }
}
