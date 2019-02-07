export class Comment {
    constructor(public body: string, 
        public user: string, 
        public postId: string, 
        public timestamp: number, 
        public parentId: string = null,
        public id: string = null
    ){
        this.children = [];
    }

    public hasParent(): boolean{
        return this.parentId != null;
    }

    public children: Comment[];

    //sorts a one dimensional list of comments into a hierarchical structure for easy nesting
    public static sortComments(input: Comment[]):Comment[]{
        let unsorted = [...input];

        let result: Comment[] = [];

        //function to check if a comment has no remaining unsorted children
        const hasNoChildren = function(toCheck: Comment): boolean{
            //check comment against each unsorted comment
            for(let comment of unsorted){
                //if any comment's parent id refers to the checked comment's ID, that comment is a child, return false
                if(comment.parentId == toCheck.id){
                    return false;
                }
            }
            //If no matches are found among unsorted comments, return true
            return true;
        }

        //run sorting passes as long as unsorted comments remain
        while(unsorted.length > 0){
            /* Check if each comment has unsorted children remaining. 
            If they don't, find their parent (if they have one) and add them to their parent's children, then remove them from the unsorted list
            otherwise, ignore and move on */
            for(let current of unsorted){
                //it has no children. find it's parent and remove it from the array. If it does have children, do nothing.
                if(hasNoChildren(current)){
                    //Only find comment's parent if it has one
                    if(current.parentId != null){
                        for(let possibleParent of unsorted){
                            //when we find the paraent, add current to that parent's children
                            if(possibleParent.id === current.parentId){
                                possibleParent.children.push(current);
                                break;
                            }
                        }
                    } else {
                        result.push(current);
                    }

                    //Now that we've properly attached the current comment to it's parent (either another comment or the main list if it has none), remove it
                    let index: number = unsorted.indexOf(current);
                    unsorted.splice(index, 1);
                }
            }
        }

        //return the result once all comments have been sorted
        return result;
    }
}

