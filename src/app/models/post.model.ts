export class Post {
    constructor(public title: string, 
        public body: string, 
        public user: string, 
        public topic: string, 
        public id: string = null){}
        //public points: number = 0,
        //public date= new Date
}