var THREE, blockW, blockD, blockH;
//65535 = '11' '11111' 1 1111 1111
//[set][type][data]
//SET
//00 or 0 Passables
//01 0r 1 Walls
//10 or 2 interactables
//11 or 3 doors
//TYPE
//hitPad, Geometry, Material
// dungeon number, floor, x coordinate, y coordinate

var overworld000 = [
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384],
    [16384, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 512, 0, 512, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 512, 16384, 0, 512, 16384, 16384, 16384, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 1024, 0, 0, 512, 16384, 16384, 0, 16384, 16384, 16384, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 1024, 16896, 1024, 0, 16384, 49153, 33280, 0, 16384, 49154, 33281, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 1024, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 512, 0, 0, 512, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 512, 0, 0, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384]
];

var dungeon1010 = [
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 32769, 0, 0, 0, 0, 49664],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 49153, 16384, 16384, 16384, 16384, 16384]
];

var dungeon1020 = [
    [16384, 16384, 16384, 16384, 16384, 49152, 16384, 16384, 16384, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [49152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384]
];

var dungeon1001 = [
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384],
    [16384, 512, 0, 0, 0, 0, 0, 0, 0, 0, 0, 512, 16384],
    [16384, 0, 0, 0, 0, 0, 32768, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49152],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384]
];

var dungeon1011 = [
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [49152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49152],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384]

];

var dungeon1021 = [
    [16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [49152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 16384, 16384, 16384, 16384, 49152, 16384, 16384, 16384, 16384, 16384]
];

var dungeon2000 = [
    ['', '', '', '', '', 16384, 16384, 16384],
    ['', '', '', '', 16384, 0, 0, 16384],
    ['', '', '', 16384, 0, 0, 0, 16384],
    ['', '', 16384, 0, 0, 0, 0, 0, 16384],
    ['', 16384, 0, 0, 0, 0, 0, 0, 0, 16384, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49152],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 0, 16384, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 16384],
    ['', 16384, 16384, 16384, 49154, 16384, 16384, 16384]
];

var dungeon2010 = [
    ['', '', '', '', 16384, 16384, 16384],
    ['', '', '', 16384, 0, 0, 0, 16384],
    ['', '', 16384, 0, 0, 0, 0, 0, 16384],
    ['', 16384, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 16384],
    [49152, 0, 0, 0, 0, 0, 0, 0, 16384],
    [16384, 0, 0, 0, 0, 0, 0, 0, 16384],
    ['', 16384, 0, 0, 0, 0, 0, 16384],
    ['', '', 16384, 0, 0, 0, 16384],
    ['', '', '', 16384, 16384, 16384]
];

var overworld = [ [
        [overworld000]
    ] ];

var dungeon1 = [ [
        ['', dungeon1010, dungeon1020],
        [dungeon1001, dungeon1011, dungeon1021]
    ] ];

var dungeon2 = [ [
        [dungeon2000, dungeon2010]
    ] ];

var dungeon3,
    dungeon4,
    dungeon5;

var mapGrid = {
    "Overworld": overworld,
    "Dungeon 1": dungeon1,
    "Dungeon 2": dungeon2,
    "Dungeon 3": dungeon3,
    "Dungeon 4": dungeon4,
    "Dungeon 5": dungeon5
};
