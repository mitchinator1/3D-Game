var player, THREE, playerGeo, playerMat, mapGrid, blockW, grid;

var Player = {
    
    init: function () {
        'use strict';

        player = new THREE.Mesh(playerGeo, playerMat);
        player.position.z = 1;
        player.castShadow = true;
        player.receiveShadow = true;
                
    }
    
};
