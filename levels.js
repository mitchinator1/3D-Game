var THREE, blockW, blockD, blockH;
// '11' '11111' 1 1111 1111
//[general][type][data]
//Interactables
//hitpad, geo, mat,
//00 or 0 Passables
//01 0r 1 Walls
//10 or 2 interactables
//11 or 3 doors
/*
var start = 61111;

var number = start.toString(2);
for (i = 0; number.length < 16; i++){
  number = "0" + number;
}

var general = parseInt(number.slice(0, 2), 2);
var type = parseInt(number.slice(2, 7), 2);
var data = parseInt(number.slice(7), 2);

switch (general) {
  case 0: general = "wall";
    break;
  case 1: general = "Passable";
    break;
  case 2: general = "Interactable";
    break;
  case 3: general = "Door";
}

//65535 = 1111 1111 1111 1111

//48 + 8
*/

var sign1 = "You are now entering Dungeon 1.";
var sign2 = "You are now entering Dungeon 2. Complete Dungeon 1 first.";
var signs = [sign1, sign2];

var blockGeo0 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat0 = new THREE.MeshLambertMaterial({ color: 0x33aa00 });
var blockGeo1 = new THREE.BoxGeometry(blockW, blockD, blockH * 2),
    blockMat1 = new THREE.MeshLambertMaterial({ color: 0xddaa55 });
var blockGeo2 = new THREE.BoxGeometry(blockW, blockD, blockH * 2),
    blockMat2 = new THREE.MeshLambertMaterial({ color: 0x119922 });
var blockGeo3 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat3 = new THREE.MeshLambertMaterial({ color: 0x000000 });
var blockGeo4 = new THREE.BoxGeometry(blockW, blockD, 0.01),
    blockMat4 = new THREE.MeshLambertMaterial({ color: 0x000000 });
var blockGeo6 = new THREE.BoxGeometry(blockW, blockD, blockH / 2),
    blockMat6 = new THREE.MeshLambertMaterial({ color: 0xdddd55 });
var blockGeo7 = new THREE.BoxGeometry(blockW, blockD, blockH),
    blockMat7 = new THREE.MeshLambertMaterial({ color: 0xddaa00 });

var b = {bt: '', hit: false}, //blank   
    o = {bt: 0, hit: false, hitPad: 0, geometry: blockGeo0, material: blockMat0 }, //space
    w = {bt: 1, hit: true, hitPad: 0.9, geometry: blockGeo1, material: blockMat1 }, //wall
    s = {bt: 2, hit: false, hitPad: 0, geometry: blockGeo2, material: blockMat2 }, //shrub
    d1 = {bt: 3, hit: true, hitPad: 0.1, geometry: blockGeo3, material: blockMat3 }, //Dungeon 1 door
    d2 = {bt: 4, hit: true, hitPad: 0.1, geometry: blockGeo4, material: blockMat4 }, //Dungeon 2 door
    id1 = {bt: 5, hit: true, hitPad: 0, geometry: blockGeo4, material: blockMat4 }, //Inner dungeon door
    id2 = {bt: 8, hit: true, hitPad: 0.2, locked: true, geometry: new THREE.BoxGeometry(blockW / 4, blockD, blockH * 2), material: blockMat1 }, //Inner locked dungeon door
    c1 = {bt: 6, hit: true, hitPad: 1, interact: {item: "Heart", coins: 5, opened: false}, geometry: blockGeo6, material: blockMat6  }; //Chest

var sign = function (index) {
    'use strict';
    return {bt: 7, hit: true, hitPad: 1, contents: signs[index], geometry: blockGeo7, material: blockMat7 };
};

// dungeon number, floor, x coordinate, y coordinate

var mapGridTest = [
  [1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024],
  [1024, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 512, 0, 512, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 512, 0, 1024, 512, 0, 0, 1024, 1024, 1024, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 512, 1024, 1024, 0, 1024, 1024, 1024, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 1024, 49152, 60001, 0, 1024, 49152, 49153, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 512, 0, 0, 512, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 0, 0, 512, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1024],
  [1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024, 1024]
];

var overworld000 = [
        [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
        [w, o, o, s, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, s, s, s, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, w, o, o, o, o, o, o, o, o, o, o, o, o, w, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, s, w, s, o, w, w, w, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, s, w, w, o, w, w, w, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, w, d1, sign(0), o, w, d2, sign(1), o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, s, o, s, o, s, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, o, o, s, o, s, o, o, o, o, o, o, o, o, o, o, o, o, o, w],
        [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
    ];

var dungeon1010 = [
    [w, w, w, w, w, w, w, w, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, c1, o, o, o, o, id2],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, w, w, w, w, d1, w, w, w, w, w]
];

var dungeon1020 = [
    [w, w, w, w, w, id1, w, w, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [id1, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, w, w, w, w, w, w, w, w, w, w]
];

var dungeon1001 = [
    [w, w, w, w, w, w, w, w, w, w, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, id1],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, w, w, w, w, w, w, w, w, w, w, w, w]
];

var dungeon1011 = [
    [w, w, w, w, w, w, w, w, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [id1, o, o, o, o, o, o, o, o, o, id1],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, w, w, w, w, w, w, w, w, w, w]
];

var dungeon1021 = [
    [w, w, w, w, w, w, w, w, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [id1, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, w],
    [w, w, w, w, w, id1, w, w, w, w, w]
];
     
var dungeon2000 = [
    [b, b, b, b, b, w, w, w],
    [b, b, b, b, w, o, o, w],
    [b, b, b, w, o, o, o, w],
    [b, b, w, o, o, o, o, o, w],
    [b, w, o, o, o, o, o, o, o, w, w, w],
    [w, o, o, o, o, o, o, o, o, o, o, id1],
    [w, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, w, w],
    [w, o, o, o, o, o, o, o, w],
    [b, w, w, w, d2, w, w, w]
];

var dungeon2010 = [
    [b, b, b, b, w, w, w],
    [b, b, b, w, o, o, o, w],
    [b, b, w, o, o, o, o, o, w],
    [b, w, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, w],
    [id1, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, w],
    [b, w, o, o, o, o, o, w],
    [b, b, w, o, o, o, w],
    [b, b, b, w, w, w]
];

var overworld = [ [
        [overworld000]
    ] ];

var dungeon1 = [ [
        ["", dungeon1010, dungeon1020],
        [dungeon1001, dungeon1011, dungeon1021]
    ] ];

var dungeon2 = [ [
        [dungeon2000, dungeon2010]
    ] ];

var dungeon3,
    dungeon4,
    dungeon5;
/*
var mapGridTest = [[429, 430, 430, 430],
                   [430, 16384, 16384, 429],
                   [430, 430, 430, 430]];
*/
var mapGrid = {
    "Overworld": overworld,
    "Dungeon 1": dungeon1,
    "Dungeon 2": dungeon2,
    "Dungeon 3": dungeon3,
    "Dungeon 4": dungeon4,
    "Dungeon 5": dungeon5
};
