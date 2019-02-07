import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection;
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

  //return all posts for a given topic id
  public getPosts(topicId: string): Observable<Post[]>{
    let topic = this.db.doc(`topics/${topicId}`).ref;

    let query = this.db.collection('posts', ref => ref.where('topic', '==', topic) );

    return query.snapshotChanges().pipe(map((actions) => {
      let result: Post[] = [];
      for(let action of actions){
        result.push(this.parsePost(action));
      }
      return result;
    }));
  }

  //get a specific post by id
  public getPost(postId: string): Observable<Post>{
    let item = this.db.doc(`posts/${postId}`);

    return item.snapshotChanges().pipe(map((action) => {

      let data:any = action.payload.data();
      let id = action.payload.id;
      return new Post(data.title, data.body, data.user, data.topic.id, data.timestamp, id);
    }));
  }

  //get all comments for a specific post
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

  //creates a new post in the database, returns a promise that resolves to the ID of the created post
  public async createPost(post: Post){
    if(post.id != null){
      throw new Error("Error: post already created.");
    }

    let ref = await this.validateRef('topics',post.topic);

    if(ref != null){
      let promise = this.postsCollection.add({
        title: post.title,
        body: post.body,
        user: post.user,
        topic: ref,
        timestamp: post.timestamp
      });
  
      let id = (await promise).id;
      return id;
    } else {
      throw new Error("Error: Can't create post with nonexistent topic reference") ;
    }
  }

  //creates a new comment attached to a post, returns a promies that resolves to the id of the created comment
  public async createComment(comment: Comment, postId: string){
    console.log(`Creating new comment ${comment} on post ID ${postId}`);
    //validate parent id if comment has a parent specified
    let hasParent: boolean = (comment.parentId != null);

    //validate all references
    let postRefPromise = this.validateRef('posts', postId);
    let parentRefPromise = hasParent ? this.validateRef(`posts/${postId}/comments`, comment.parentId) : null;

    let postRef = await postRefPromise;
    let parentRef = await parentRefPromise;

    console.log(`Post reference: ${postRef}`);
    console.log(`Parent reference: ${parentRef}`);

    if(postRef != null && (parentRef != null || hasParent == false)){
      console.log('posting comment');
      let comments = this.db.collection(`posts/${postId}/comments`);
      let promise = comments.add({
        body: comment.body,
        user: comment.user,
        parent: parentRef ? parentRef : null
      });

      let id = (await promise).id;
      return id;
    } else {
      throw new Error("Error: can't create comment with bad references");
    }

  }

  //return a list of all topics
  public getTopics(): Observable<Topic[]>{
    let topics = this.db.collection('/topics');

    return topics.snapshotChanges().pipe(map(actions => {
      let result: Topic[] = [];
      for(let action of actions){
        let data:any = action.payload.doc.data();
        let id = action.payload.doc.id;
        result.push(new Topic(data.title, data.description, id));
      }
      return result;
    }));
  }

  public getTopic(topicId: string): Observable<Topic>{
    let item = this.db.doc(`topics/${topicId}`);

    return item.snapshotChanges().pipe(map((action) => {
     let data:any = action.payload.data();
     let id = action.payload.id;
     return new Topic(data.title, data.description, id);
    }));
  }

  private parsePost(action: DocumentChangeAction<any>): Post{
    let data = action.payload.doc.data();
    let id = action.payload.doc.id;
    return new Post(data.title, data.body, data.user, data.topic.id, data.timestamp, id);
  }

  private async validateRef(collection: string, refId: string){
    let doc = this.db.doc(`${collection}/${refId}`);
    let promise = doc.ref.get();

    let exists = (await promise).exists;
    if(exists){
      return doc.ref;
    } else {
      return null;
    }
  }
}
