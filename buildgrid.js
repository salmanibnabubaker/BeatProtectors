//hierarchy
//->div-gamespace(id)
//  ->div-grid-container(id)
//top-left corner is user starting point
//bottom right corner is cave from where protectors emerges

import Enemy from "./enemy.js";
import User from "./user.js";


function findhidespots(x,y,n,m,matrix){
    let spots=[];
    for(let i=x;i<=n;i++){
        for(let j=y;j<=m;j++){
            if(matrix[i][j]==1){
                spots.push([i,j]);
            }
        }
    }
    
    let index = Math.floor(Math.random()*spots.length);
    return spots[index];
    
}

function constructmatrix(n,m){
    let matrix=[];
    let hidecount=5;
    for(let i=0;i<n;i++){
        let row=[];
        for(let j=0;j<m;j++){
            if((i==0&&j==0)||(i==n-1&&j==m-1)){
                row.push(1);
                continue;
            }
            if(Math.ceil(Math.random()*4)==1){
                row.push(0);
            }
            else{
                row.push(1);
            }
        }
        matrix.push(row);
    }


    //find hidespots
    
    let ranges=[[0,0,9,9],[0,10,9,10],[10,0,19,9],[10,10,19,19]];

    for(let k=0;k<ranges.length;k++){
        let limits=ranges[k];
        let [i,j]=findhidespots(limits[0],limits[1],limits[2],limits[3],matrix);
        matrix[i][j]=2;
    }
    

    return matrix;
}

function constructgrid(matrix){
    let Container = document.getElementById("game-space");
    let Parent = document.createElement('div');
    Parent.setAttribute("id","grid-container");
    for(let i=0;i<20;i++){
        for(let j=0;j<20;j++){
            let Block = document.createElement('div');
            Block.style.left = String(j*20)+"px";
            Block.style.top = String(i*20)+"px";
            if(matrix[i][j]==0){
                Block.setAttribute("class","gridblock obstacle");
            }
            else if(matrix[i][j]==2){
                Block.setAttribute("class","gridblock hidespot");
            }
            else{
                Block.setAttribute("class","gridblock");
            }
            Parent.appendChild(Block);
        }
    }
    Container.appendChild(Parent);
    matrix[0][0]=0;
    matrix[n-1][m-1]=0;
}
function foundpath(i,j,n,m,vis,matrix){
    if(i<0||j<0||i==n||j==m){
        return false;
    }
    if(vis[i][j]==1||matrix[i][j]==0){
        return false;
    }
    if(i==n-1&&j==m-1){
        return true;
    }
    let dx=[1,0,-1,0];
    let dy=[0,1,0,-1];
    vis[i][j]=1;
    for(let k=0;k<dx.length;k++){
        if(foundpath(i+dy[k],j+dx[k],n,m,vis,matrix)){
            return true;
        }
    }
    return false;
}
function pathexist(sourceX,sourceY,destX,destY,n,m,matrix){
    let vis=[];
    for(let i=0;i<n;i++){
        let row=[];
        for(let j=0;j<m;j++){
            row.push(0);
        }
        vis.push(row);
    }
    return foundpath(sourceX,sourceY,destX+1,destY+1,vis,matrix);
}





let n=20;
let m=20;
let maxtries=10;
let matrix;
while(maxtries>0){
    matrix = constructmatrix(n, m);
    if (pathexist(0,0,n-1,m-1,n, m, matrix)) {
        constructgrid(matrix);
        break;
    }
    maxtries--;
}




let enemy1;
let enemy2;
let enemy3;
setTimeout(()=>{
    enemy1 = new Enemy(n,m,n,m,matrix);
    enemy1.addenemy();
},1000);

setTimeout(()=>{
    enemy2 = new Enemy(n,m,n,m,matrix);
    enemy2.addenemy();
},3000);


setTimeout(()=>{
    enemy3 = new Enemy(n,m,n,m,matrix);
    enemy3.addenemy();
},5000);


let user=new User(0,0,matrix);
user.adduser();
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown" || 
        event.key === "ArrowLeft"  || event.key === "ArrowUp") {
        user.moveuser(event.key);
    }
    if (event.key == "a" || event.key == "A") {
        user.startattack();
    }
    if (event.key === "d" || event.key === "D") {
        user.startdefense();
    }
    if (event.key === "h" || event.key === "H") {
        user.hideinspot();
    }
});
