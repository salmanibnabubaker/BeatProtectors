import Queue from "./queue.js";


class enemy{
    constructor(i,j,n,m,matrix){
        this.i=i;
        this.j=i;
        this.n=n;
        this.m=m;

        this.destinations = this.reachablepositions(this.n,this.m,matrix);
    }
    reachablepositions(n,m,matrix){
        let destinations=[];
        let vis=[];
        for(let i=0;i<n;i++){
            let row=[];
            for(let j=0;j<m;j++){
                row.push(0);
            }
            vis.push(row);
        }
        
        let dx=[-1,0,1,0];
        let dy=[0,1,0,-1];

        let queue=new Queue();
        queue.enqueue([n-1,m-1]);
        vis[n-1][m-1]=1;


        while(queue.length!=0){
            let sz=queue.length;
            for(let i=0;i<sz;i++){
                let frontindex = queue.front();
                queue.dequeue();
                for(let j=0;j<dx.size;j++){
                    let x=frontindex[0]+dx[j];
                    let y=frontindex[1]+dy[j];
                    if(x<0||y<0||x==n||y==m){
                        continue;
                    }
                    if(vis[x][y]==1){
                        continue;
                    }
                    queue.enqueue([x,y]);
                    vis[x][y]=1;
                    destinations.push([x,y]);
                }
            }
        }

        return destinations;
    }
    selectdestination(i,j){
        this.destinations = this.destinations.filter(num=>num!=[i,j]);
        let index = Math.floor(Math.random()*this.destinations.length);
        let dest = this.destinations[index];
        this.destinations.push([i,j]);
        return dest;
    }
    findshortestpath(sourceX,sourceY,destX,destY,matrix){
        let prevblock=[];
        let vis=[];
        for(let i=0;i<matrix.length;i++){
            let row=[];
            let visrow=[];
            for(let j=0;j<matrix[0].length;j++){
                row.push([]);
                visrow.push(0);
            }
            prevblock.push(row);
            vis.push(visrow);
        }

        let dx=[-1,0,1,0];
        let dy=[0,1,0,-1];

        let queue = new Queue();
        queue.enqueue([sourceX,sourceY]);
        vis[sourceX][sourceY]=1;
        prevblock[sourceX][sourceY]=[-1,-1];

        let found=false;
        while(queue.length!=0){
            let sz=queue.length;
            for(let i=0;i<sz;i++){
                let index = queue.front();
                queue.dequeue();
                for(let j=0;j<dx.length;j++){
                    let x=index[0]+dx[j];
                    let y=index[1]+dy[j];
                    if(x<0||y<0||x==this.n-1||y==this.m-1||vis[x][y]==1){
                        continue;
                    }
                    queue.enqueue([x,y]);
                    vis[x][y]=1;
                    prevblock[x][y]=index;
                    if(x==destX&&y==destY){
                        found=true;
                        break;
                    }
                }
                if(found){
                    break;
                }
            }
        }


        let path=[];
        let x=prevblock[destX][destY][0];
        let y=prevblock[destX][destY][1];

        path.push([x,y]);
        while(x!=-1&&y!=-1){
            x=prevblock[x][y][0];
            y=prevblock[x][y][1];
        }
        path.push([sourceX,sourceY]);

        for(let i=0;i<=path.length/2;i++){
            let temp=path[i][0];
            path[i][0]=path[path.length-i-1][0];
            path[path.length-i-1][0]=temp;

            temp=path[i][1];
            path[i][1]=path[path.length-i-1][1];
            path[path.length-i-1][1]=temp;
        }

        return path;
    }
}