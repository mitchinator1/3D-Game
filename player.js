var player, THREE, playerGeo, playerMat, mapGrid, blockW, grid;

var Player = {
    
    init: function () {
        'use strict';

        player = new THREE.Mesh(playerGeo, playerMat);
        player.position.z = 1;
        player.castShadow = true;
        player.receiveShadow = true;
                
    },
    
    setDungeonPosition: function () {
        'use strict';
        
        player.position.x = (mapGrid[grid.location][grid.floor][grid.gridY][grid.gridX][0].length - 1) * blockW - 2;
        //player.position.y
        
    }
    
};