function game(scenc3d, grid, eventmanger, cube){
    this.scenc3d = scenc3d;
    this.grid = new grid();
    this.eventmanger = eventmanger;
    var pos = this.grid.randomPos();
    var cube1 = new cube(pos);
    this.scenc3d.add(cube1.mesh);
    this.grid.add(pos,cube1);

    var pos = this.grid.randomPos();
    var cube2 = new cube(pos);
    this.scenc3d.add(cube2.mesh);
    this.grid.add(pos,cube2);

    this.eventmanger = new eventmanger();
    var vector = {
        up:{x:0, y:1},
        left:{x:-1,y:0},
        right:{x:1,y:0},
        down:{x:0,y:-1}
    }
    var self = this;
    this.eventmanger.on("move",function(data){
        console.log(data);
        var decret =vector[data];
        var forgrid = {x:[], y:[]};
        for(var g =0; g<4; g++){
            forgrid.x.push(g);
            forgrid.y.push(g);
        }
        if(data == "right"){
            forgrid.x.reverse();
        }
        if(data == "up"){
            forgrid.y.reverse();
        }


       forgrid.x.forEach(function(x){
           forgrid.y.forEach(function(y){
                var cell = {x:x,y:y};
                var hasCube = self.grid.hasCube(cell);
                if(hasCube){
                    var farCell = self.grid.findFarCell(cell, decret);
                    var nextCell = self.grid.findCellByPos(farCell.next);
                    if(farCell && nextCell && hasCube.value == nextCell.value){
                        self.scenc3d.remove(hasCube.cube.mesh);
                        self.scenc3d.remove(nextCell.cube.mesh);
                        var cubeAdd = new cube(farCell.next,nextCell.value *2);
                        self.scenc3d.add(cubeAdd.mesh);
                        self.grid.gridPos[farCell.prev.x][farCell.prev.y] = 0;
                        self.grid.gridPos[farCell.next.x][farCell.next.y] = 0;
                        self.grid.gridPos[farCell.next.x][farCell.next.y] = {cube:cubeAdd, value:nextCell.value *2};
                        self.grid.gridPos[x][y] = 0;
                        self.addScore(nextCell.value *2);
                    }else{
                        hasCube.cube.move(farCell.prev);
                        self.grid.gridPos[x][y] = 0;
                        self.grid.gridPos[farCell.prev.x][farCell.prev.y] = {cube:hasCube.cube, value:hasCube.value};
                    }


                }
            })
        })
        var pos = self.grid.randomPos();
        if(pos == "over"){
            alert("Game Over")
        }else{
            var cube1 = new cube(pos);
            self.scenc3d.add(cube1.mesh);
            self.grid.add(pos,cube1);
        }


    })
}
var scorEm = document.getElementById("score");
game.prototype.addScore = function(score){
    scorEm.innerHTML = Number(scorEm.innerHTML) + score;
}