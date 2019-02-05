import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
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

  public getPost(){

  }

  private parsePost(action: DocumentChangeAction<any>): Post{
    let data = action.payload.doc.data();
    let id = action.payload.doc.id;
    return new Post(data.title, data.body, data.user, data.topic.id, id);
  }
}
