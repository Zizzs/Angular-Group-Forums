export class Post {
    constructor(public title: string, 
        public body: string, 
        public user: string, 
        public topic: string, 
        public id: string = null){}
}