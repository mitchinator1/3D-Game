var THREE, scene = new THREE.Scene(), renderer = new THREE.WebGLRenderer( { antialias: true } ),
    canvas = document.getElementById("hud"), ctx = canvas.getContext("2d"),
    mainCam, pointLight, ambLight,
    planeGeo, planeMat, plane,
    Grid, Player, Camera, HUD, Lighting, Input, Storage;

var geometry = new THREE.CircleGeometry( 5, 16 );
var material = new THREE.MeshBasicMaterial( { color: 0xff9955 } );
var coin = new THREE.Mesh( geometry, material );
scene.add( coin );

(function init() {
    'use strict';
    
    renderer.shadowMap.enabled = true;
    renderer.setSize(900, 700);
    document.body.appendChild(renderer.domElement);
    
    Storage.load();
    
    Player.init();
    
    Camera.init("mainCam", 10, 15);
    Lighting.init(0);
    HUD.init();
    Input.init();
    
    Grid.init();
    
    plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    
    scene.add(Player, pointLight, ambLight, plane);
    
}());

var render = function (ts) {
    'use strict';
    
    renderer.render(scene, mainCam);
    HUD.refresh();
    
    Input.movement(ts, mainCam);
    
    requestAnimationFrame(render);
    
};

render();
