export class Comment {
    constructor(public body: string, 
        public user: string, 
        public postId: string, 
        public parentId: string = null, 
        public id: string = null){}
}