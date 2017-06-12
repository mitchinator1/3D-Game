var blockH = 2, blockW = 2, blockD = 2, THREE;

var playerGeo = new THREE.BoxGeometry(blockW - 0.1, blockD - 0.1, blockH - 0.1),
    playerMat = new THREE.MeshLambertMaterial({ color: 0x0000ff });

var planeGeo = new THREE.PlaneGeometry(400, 400),
    planeMat = new THREE.MeshStandardMaterial({ color: 0xbbccbb });
/*
var blockGeo0 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat0 = new THREE.MeshLambertMaterial({ color: 0x00aa00 });
var blockGeo1 = new THREE.BoxGeometry(blockW, blockD, blockH * 2),
    blockMat1 = new THREE.MeshLambertMaterial({ color: 0xcc9955 });
var blockGeo2 = new THREE.BoxGeometry(blockW, blockD, blockH * 2),
    blockMat2 = new THREE.MeshLambertMaterial({ color: 0x118811 });
var blockGeo3 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat3 = new THREE.MeshLambertMaterial({ color: 0x000000 });
var blockGeo4 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat4 = new THREE.MeshLambertMaterial({ color: 0x000000 });
var blockGeo6 = new THREE.BoxGeometry(blockW, blockD, blockH / 2),
    blockMat6 = new THREE.MeshLambertMaterial({ color: 0xdddd55 });
var blockGeo7 = new THREE.BoxGeometry(blockW, blockD, blockH),
    blockMat7 = new THREE.MeshLambertMaterial({ color: 0xddaa00 });

//index of arrays equals type of block to set
var blockGeos = [blockGeo0, blockGeo1, blockGeo2, blockGeo3, blockGeo4, blockGeo4, blockGeo6, blockGeo7];
var blockMats = [blockMat0, blockMat1, blockMat2, blockMat3, blockMat4, blockMat4, blockMat6, blockMat7];
*/