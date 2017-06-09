var b = {bt: ''}; //blank
var o = {bt: 0}; //space
var w = {bt: 1}; //wall
var s = {bt: 2}; //shrub
var d1 = {bt: 3}; //Dungeon 1 door
var d2 = {bt: 4}; //Dungeon 2 door
var id1 = {bt: 5}; //Inner dungeon door

// dungeon number, floor, x coordinate, y coordinate

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
        [w, o, o, o, o, o, o, o, w, d1, w, o, w, d2, w, o, o, o, o, o, w],
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
    [w, o, o, o, o, o, o, o, o, o, id1],
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
    [w, o, o, o, o, o, o, o, o, o, o, o, id1],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
    [w, o, o, o, o, o, o, o, o, o, o, o, w],
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
        [b, dungeon1010, dungeon1020],
        [dungeon1001, dungeon1011, dungeon1021]
    ] ];

var dungeon2 = [ [
        [dungeon2000, dungeon2010]
    ] ];

var mapGrid = {
    Overworld: overworld,
    Dungeon1: dungeon1,
    Dungeon2: dungeon2
};
