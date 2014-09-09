function grid(){
    this.size = 4;
    this.gridPos = [//
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
}
grid.prototype.add = function(pos,cube,value){
    if(this.isover())return;

    var gridpos = this.gridPos[pos.x][pos.y];
    if(gridpos!=0){
        gridpos.cube = cube;

        gridpos.value = value || cube.numText ;
    }else{
        this.gridPos[pos.x][pos.y] = {
            cube:cube,
            value:value || cube.numText
        };

    }

}
grid.prototype.isover = function(){
    for(var i=this.gridPos.length-1;i>0;i--){
        for(var j = this.gridPos[i].length-1;j>0;j--){
            if(this.gridPos[i][j]==0){
                return false;
            }
        }
    }
    return true;

}
grid.prototype.remove = function(pos){
    this.gridPos[pos.x][pos.y] = 0;
}
grid.prototype.randomPos = function(){
    var randomposArr = [];
    for(var x = 0; x< this.gridPos.length; x++){
        for(var y = 0; y<this.gridPos[x].length;y++){
            if(this.gridPos[x][y]==0){
                randomposArr.push({x:x, y:y, z:0});
            }
        }
    }
    if(randomposArr.length==0)return "over";
    return randomposArr[Math.floor(Math.random() * randomposArr.length)];
}
grid.prototype.hasCube = function(pos){
    if(pos.x <0 || pos.y <0 || pos.x>3 || pos.y>3)return false;
    if(this.gridPos[pos.x][pos.y]==0)return 0;
    return this.gridPos[pos.x][pos.y];
}
grid.prototype.isbound = function(pos){
    if(pos.x>=0 && pos.x<this.size && pos.y>=0 && pos.y< this.size)return true;
    return false;
}
grid.prototype.findFarCell = function(pos,vetor){
    var next = pos,previous;
    do{
        previous = next;
        next = {x:previous.x + vetor.x, y:previous.y + vetor.y};

}while(this.hasCube(next) === 0  && this.isbound(next));
    return {prev:previous, next:next};
}
grid.prototype.findCellByPos = function(next){
    if(next.x<0 || next.y<0 || next.x>3 || next.y>3)return false;
    if(this.gridPos[next.x][next.y]){
        return this.gridPos[next.x][next.y];
    }
    return false;
}