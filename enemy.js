import Queue from "./queue.js";


class enemy{
    constructor(i,j,n,m,matrix){
        this.i=i-1;
        this.j=j-1;
        this.n=n;
        this.m=m;
        this.matrix=matrix;
        this.destinations = this.reachablepositions(this.n,this.m,this.matrix);
        this.path=[];
        this.en=document.getElementById("");
    }
    addenemy(){
        let Parent = document.getElementById("grid-container");
        let enemy = document.createElement('div');
        enemy.setAttribute("class","enemy");
        enemy.style.top=String(20*(this.n-1))+"px";
        enemy.style.left=String(20*(this.m-1))+"px";
        this.en=enemy;
        Parent.appendChild(enemy);

        let dest=this.selectdestination(this.i,this.j);
        let path=this.findshortestpath(this.i,this.j,dest[0],dest[1],this.matrix);
        this.path=path;
        this.enemymovestart(0);
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

        while(queue.q.length!=0){
            let sz=queue.q.length;
            for(let i=0;i<sz;i++){
                let frontindex = queue.front();
                queue.dequeue();
                for(let j=0;j<dx.length;j++){
                    let x=frontindex[0]+dx[j];
                    let y=frontindex[1]+dy[j];
                    if(x<0||y<0||x==n||y==m){
                        continue;
                    }
                    if(matrix[x][y]==0||vis[x][y]==1){
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
        let removeSource=[];
        for(let k=0;k<this.destinations.length;k++){
            if(this.destinations[k][0]==i&&this.destinations[k][1]==j){
                continue;
            }
            removeSource.push(this.destinations[k]);
        }
        this.destinations=removeSource;
        let index = Math.floor(Math.random()*this.destinations.length);
        let dest = this.destinations[index];
        this.destinations.push([i,j]);
        return dest;
    }
    findshortestpath(sourceX, sourceY, destX, destY, matrix) {
        let prevblock = [];
        let vis = [];

        for (let i = 0; i < matrix.length; i++) {
            let row = [];
            let visrow = [];
            for (let j = 0; j < matrix[0].length; j++) {
                row.push(null);
                visrow.push(0);
            }
            prevblock.push(row);
            vis.push(visrow);
        }

        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];

        let queue = new Queue();
        queue.enqueue([sourceX, sourceY]);
        vis[sourceX][sourceY] = 1;
        prevblock[sourceX][sourceY] = [-1, -1]; 

        let found = false;
        while (queue.q.length != 0) {
            let index = queue.front();
            queue.dequeue();

            for (let j = 0; j < dx.length; j++) {
                let x = index[0] + dx[j];
                let y = index[1] + dy[j];

                if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[0].length) {
                    continue;
                }
                if (matrix[x][y] == 0 || vis[x][y] == 1) {
                    continue;
                }

                queue.enqueue([x, y]);
                vis[x][y] = 1;
                prevblock[x][y] = [index[0], index[1]];

                if (x == destX && y == destY) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }

        let path = [];
        let curX = destX, curY = destY;
        while (curX !== -1 && curY !== -1) {
            path.push([curX, curY]);
            [curX, curY] = prevblock[curX][curY];
        }

        return path.reverse();
    }

    enemymovestart(index){
        setTimeout(()=>{this.enemymove(index)},500);
    }
    enemymove(index){
        this.en.style.top=String(this.path[index][0]*20)+"px";
        this.en.style.left=String(this.path[index][1]*20)+"px";
        this.i=this.path[index][0];
        this.j=this.path[index][1];
        if(index!=this.path.length-1){
            this.enemymovestart(index+1);
        }
        else{
            let dest=this.selectdestination(this.i,this.j);
            let path=this.findshortestpath(this.i,this.j,dest[0],dest[1],this.matrix);
            this.path=path;
            this.enemymovestart(0);
        }
    }
}
export default enemy;