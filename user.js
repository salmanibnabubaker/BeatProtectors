import Queue from "./queue.js";

class user{
    constructor(i,j,matrix){
        this.i=i;
        this.j=j;
        this.matrix=matrix; 
        this.defense = new Queue();
        this.attack = new Queue();
        this.points = 0 ;
        this.canmove = true;
        this.us = document.getElementById("")
    }

    adduser(){
        let Parent = document.getElementById("grid-container");
        let user = document.createElement('div');
        user.setAttribute("class","user");
        user.style.top=String(0)+"px";
        user.style.left=String(0)+"px";
        this.us=user;
        Parent.appendChild(user);
        this.matrix[0][0]=0;
    }


    displaypoints(){
        document.getElementById("PointSpace").innerText="Points earned:"+String(this.points);
    }
    startdefense(){
        this.defense.enqueue(1);
        setTimeout(()=>this.terminatedefense(),600);
    }
    terminatedefense(){
        this.defense.dequeue();
    }

    startattack(){
        this.attack.enqueue(1);
        setTimeout(()=>this.terminateattack(),600);
    }
    terminateattack(){
        this.attack.dequeue();
    }
    updateposition(){
        this.us.style.top=String(this.i*20)+"px";
        this.us.style.left=String(this.j*20)+"px";
    }
    moveuser(key){
        if(!this.canmove){
            return;
        }
        //move-up
        if(key=='ArrowUp'){
            if(this.i-1<0||this.matrix[this.i-1][this.j]==0){
                return;
            }
            this.i=this.i-1;
        }
        //move-down
        if(key=='ArrowDown'){
            if(this.i+1==this.matrix.length||this.matrix[this.i+1][this.j]==0){
                return;
            }
            this.i=this.i+1;
        }
        //move-left
        if(key=='ArrowLeft'){
            if(this.j-1<0||this.matrix[this.i][this.j-1]==0){
                return;
            }
            this.j=this.j-1;
        }
        //move-down
        if(key=='ArrowRight'){
            if(this.j+1==this.matrix[0].length||this.matrix[this.i][this.j+1]==0){
                return;
            }
            this.j=this.j+1;
        }
        this.updateposition();
    }

}

export default user;