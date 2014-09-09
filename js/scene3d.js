function scene3d(id,w,h){
    window.scene = "";
    window.renderer = "";
    window.camera = "";
    window.cameraAngle = 75;
    window.cameraNear = 10;
    window.cameraFar = 8000;
    window.contain = document.getElementById(id);
    window.w = w;
    window.h = h;
    window.contain.style.width = w +"px";
    window.contain.style.height = h +"px";
}
scene3d.prototype.init = function(cube){
    this.createScene(w, h);
    this.createCamera();

    this.createLight();
    this.createWebGlRender();

    animate();

}
scene3d.prototype.createScene = function(){
    scene = new THREE.Scene();

}
scene3d.prototype.createCamera = function(){
    camera = new THREE.PerspectiveCamera(cameraAngle, w / h, 1, cameraFar);
    camera.position.y = 0;
    camera.position.x = 0;
    camera.position.z =250;
    camera.up.y = 1;
    camera.up.x =0;
    camera.up.z = 0;
    camera.lookAt({x:0, y:0, z:0 } );
    scene.add(camera);


}
scene3d.prototype.createLight = function(){
    light = new THREE.Light(0xff0000, 1.0, 0);
    light.position.set(100,100,100);
    scene.add(light);
}
scene3d.prototype.createWebGlRender = function(){
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(w, h);
    renderer.setClearColorHex(0xffffff, 1.0);
    contain.appendChild(renderer.domElement);
    renderer.render(scene, camera);

}
function renderor(){
    renderer.render(scene, camera);
    animate();
}
function animate(){
    var self = this;
    requestAnimationFrame(renderor);
}
scene3d.prototype.add = function(cube){

    scene.add(cube);


}
scene3d.prototype.remove = function(cube){
    scene.remove(cube);
}
