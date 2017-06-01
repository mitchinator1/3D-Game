var scene = new THREE.Scene(), renderer = new THREE.WebGLRenderer(),
    canvas = document.getElementById("hud"), ctx = canvas.getContext("2d"),
    hud = Object.create(HUD), player = Object.create(Player), input = Object.create(Input), storage = Object.create(Storage), grid = Object.create(Grid), camera = Object.create(Camera), lighting = Object.create(Lighting),
    mainCam, pointLight, ambLight,
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
    
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    
    scene.add(player, pointLight, ambLight, plane);
}());

var rCameraHelper = new THREE.Mesh(playerGeo, playerMat);
rCameraHelper.position.z = 1.5;
var tCameraHelper = new THREE.Mesh(playerGeo, playerMat);
tCameraHelper.position.z = 1.5;
scene.add(rCameraHelper, tCameraHelper);

var render = function (ts) {
    
    rCameraHelper.position.x = player.position.x + 6;
    rCameraHelper.position.y = player.position.y;
    tCameraHelper.position.x = player.position.x;
    tCameraHelper.position.y = player.position.y + 8;
    
    input.movement(ts, grid.gridArray, grid.location, mainCam);
    
    renderer.render(scene, mainCam);
    
    hud.refresh();
    hud.displayInventory();
    
    requestAnimationFrame(render);
    
};

render();