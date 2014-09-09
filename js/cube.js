function cube(pos,value){
    this.len = 20;
    this.dist = 21;

    this.cubeGeo = new THREE.CubeGeometry(this.len,this.len,this.len);
    this.dynamicTexture = new THREEx.DynamicTexture(512,512);

    this.numText = value || (Math.random()>0.9?4:2);
    this.dynamicTexture.context.font = "bolder 120px Verdana";
    this.dynamicTexture.clear('#ff8800').drawText(this.numText, undefined, 256, "green");
    var material = new THREE.MeshBasicMaterial({
        map	:  this.dynamicTexture.texture
    });
    this.mesh	= new THREE.Mesh(this.cubeGeo, material );

    this.setPosition(pos.x * this.dist, pos.y * this.dist, 0 * this.dist);


}

cube.prototype.setPosition=function(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.mesh.position.set(x,y,z);
   // this.addScene();
}

cube.prototype.move = function(pos){
    this.mesh.position.set(pos.x * this.dist, pos.y * this.dist, 0);
}