import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<Post>;
  private posts: Observable<Post[]>;

  constructor(private db: AngularFirestore) {
    this.postsCollection = db.collection<Post>('posts');

    this.posts = this.postsCollection.snapshotChanges().pipe(map(actions => {
      let result: Post[] = [];
      for(let action of actions){
        result.push(this.parsePost(action));
      }
      return result;
    }));
  }

  //Gets an observable that returns all posts with a specified topic
  public getAllPosts(): Observable<Post[]>{
    return this.posts;
  }

  public getPosts(topicId: string): Observable<Post[]>{
    let topic = this.db.doc(`topics/${topicId}`).ref;
    console.log(topic);

    let query = this.db.collection('posts', ref => ref.where('topic', '==', topic) );

    return query.snapshotChanges().pipe(map((actions) => {
      let result: Post[] = [];
      for(let action of actions){
        result.push(this.parsePost(action));
      }
      return result;
    }));

  }

  public getPost(postId: string): Observable<Post>{
    let item = this.db.doc(`posts/${postId}`);

    return item.snapshotChanges().pipe(map((action) => {

      let data:any = action.payload.data();
      let id = action.payload.id;
      return new Post(data.title, data.body, data.user, data.topic.id, id);
    }));
  }

  public getComments(postId: string):Observable<Comment[]>{
    let comments = this.db.collection(`posts/${postId}/comments`);

    return comments.snapshotChanges().pipe(map((actions) => {
      let result: Comment[] = [];
      for(let action of actions){
        let data:any = action.payload.doc.data();
        let id = action.payload.doc.id;
        result.push(new Comment(data.body, data.user, postId, data.parent ? data.parent.id: null, id));
      }
      return result;
    }));
  }

  private parsePost(action: DocumentChangeAction<any>): Post{
    let data = action.payload.doc.data();
    let id = action.payload.doc.id;
    return new Post(data.title, data.body, data.user, data.topic.id, id);
  }
}
