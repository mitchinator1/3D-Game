var hearts = [], scene = new THREE.Scene(), renderer = new THREE.WebGLRenderer(),
    hud = Object.create(HUD), player = Object.create(Player), input = Object.create(Input),
    storage = Object.create(Storage), grid = Object.create(Grid), camera = Object.create(Camera), lighting = Object.create(Lighting), mainCam, pointLight, ambLight, 
    canvas = document.getElementById("hud"), ctx = canvas.getContext("2d"),
    planeGeo, planeMat, plane;

(function init() {
    renderer.shadowMap.enabled = true;
    renderer.setSize(900, 700);
    document.body.appendChild(renderer.domElement);
    
    storage.load();
    
    player.init();
    player.controllable = true;
    camera.init("mainCam", player.position.x, 10, 15);
    lighting.init();
    hud.init();
    input.init();
    grid.init();
    
    grid.update = true;
    
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    
    scene.add(player, pointLight, ambLight, plane);
}());
/*
var rCameraHelper = new THREE.Mesh(playerGeo, playerMat);
rCameraHelper.position.z = 1.5;
var lCameraHelper = new THREE.Mesh(playerGeo, playerMat);
lCameraHelper.position.z = 1.5;
var tCameraHelper = new THREE.Mesh(playerGeo, playerMat);
tCameraHelper.position.z = 1.5;
var bCameraHelper = new THREE.Mesh(playerGeo, playerMat);
bCameraHelper.position.z = 1.5;
scene.add(rCameraHelper, lCameraHelper, tCameraHelper, bCameraHelper);
*/

var lastCalledTime;
var fps;

function requestAnimFrame() {

  if(!lastCalledTime) {
     lastCalledTime = Date.now();
     fps = 0;
     return;
  }
  delta = (Date.now() - lastCalledTime)/1000;
  lastCalledTime = Date.now();
  fps = 1/delta;
} 

var render = function (ts) {
    /*
    rCameraHelper.position.x = player.position.x + 6;
    rCameraHelper.position.y = player.position.y;
    lCameraHelper.position.x = player.position.x - 6;
    lCameraHelper.position.y = player.position.y;
    tCameraHelper.position.x = player.position.x;
    tCameraHelper.position.y = player.position.y + 8;
    bCameraHelper.position.x = player.position.x;
    bCameraHelper.position.y = player.position.y - 8;
    */
    
    requestAnimFrame()
    ctx.fillStyle = "Black";
    ctx.font = "normal 14pt Arial";
    ctx.fillText(fps + " fps", 10, 10);
    requestAnimationFrame(render);
    
    input.movement(ts, grid.gridArray, grid.location, mainCam);
    
    grid.render(grid.location);
    
    renderer.render(scene, mainCam);
    
    hud.refresh();
    hud.displayInventory();
    
};

render();
