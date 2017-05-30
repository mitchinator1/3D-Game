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

var render = function (ts) {
    requestAnimationFrame(render);
    
    input.movement(ts, grid.gridArray, grid.location, mainCam);
    
    grid.render(grid.location);
    
    renderer.render(scene, mainCam);
    
    hud.refresh();
    hud.displayInventory();
    
};

render();