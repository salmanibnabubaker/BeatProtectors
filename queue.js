class Queue{
    constructor(){
        this.q=[];
    }
    enqueue(element){
        this.q.push(element);
    }
    dequeue(){
        if(this.q.length==0){
            return;
        }
        this.q.shift();
    }
    front(){
        if(this.q.length==0){
            return -1;
        }
        return this.q[0];
    }
}
export default Queue;