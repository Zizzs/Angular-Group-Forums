export class Post {
    constructor(public title: string, 
        public body: string, 
        public user: string, 
        public topic: string,
        public timestamp: number,
        public id: string = null){}
    
        public getTimestampDate(){
            if(this.timestamp){
                return new Date(this.timestamp);
            } else {
                return null;
            }
        }
}