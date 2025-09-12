//hierarchy
//->div-gamespace(id)
//  ->div-grid-container(id)
//top-left corner is user starting point
//bottom right corner is cave from where protectors emerges

function constructmatrix(n,m){
    let matrix=[];
    for(let i=0;i<n;i++){
        let row=[];
        for(let j=0;j<m;j++){
            if((i==0&&j==0)||(i==n-1&&j==m-1)){
                row.push(1);
                continue;
            }
            if(Math.ceil(Math.random()*3)==1){
                row.push(0);
            }
            else{
                row.push(1);
            }
        }
        matrix.push(row);
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
            else{
                Block.setAttribute("class","gridblock");
            }
            Parent.appendChild(Block);
        }
    }
    Container.appendChild(Parent);
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
function pathexist(n,m,matrix){
    let vis=[];
    for(let i=0;i<n;i++){
        let row=[];
        for(let j=0;j<m;j++){
            row.push(0);
        }
        vis.push(row);
    }
    return foundpath(0,0,n,m,vis,matrix);
}

let n=20;
let m=20;
let maxtries=10;

while(maxtries>0){
    let matrix = constructmatrix(n, m);
    if (pathexist(n, m, matrix)) {
        constructgrid(matrix);
        break;
    }
    maxtries--;
}

