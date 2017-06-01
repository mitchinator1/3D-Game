var THREE, HUD, Player, Input, Grid, Camera, Lighting, scene = new THREE.Scene(), renderer = new THREE.WebGLRenderer(),
    canvas = document.getElementById("hud"), ctx = canvas.getContext("2d"),
    hud = Object.create(HUD), player = Object.create(Player), input = Object.create(Input), storage = Object.create(Storage), grid = Object.create(Grid), camera = Object.create(Camera), lighting = Object.create(Lighting),
    mainCam, pointLight, ambLight,
    planeGeo, planeMat, plane;

//scene.fog = new THREE.Fog(0x000000, 0.015, 100);
//scene.fog = new THREE.FogExp2( 0x000000, 0.045 );

(function init() {
    'use strict';
    
    renderer.shadowMap.enabled = true;
    renderer.setSize(900, 700);
    document.body.appendChild(renderer.domElement);
    
    storage.load();
    
    player.init();
    player.controllable = true;
    
    camera.init("mainCam", 10, 15);
    lighting.init(45);
    hud.init();
    input.init();
    
    grid.init();
    
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    
    scene.add(player, pointLight, ambLight, plane);
    
}());

var render = function (ts) {
    'use strict';
    
    renderer.render(scene, mainCam);
    hud.refresh();
    
    input.movement(ts, mainCam);
    
    requestAnimationFrame(render);
    
};

render();
