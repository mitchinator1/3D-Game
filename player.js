var player, THREE, playerGeo, playerMat;

var Player = {
    
    init: function () {
        'use strict';

        Player = new THREE.Mesh(playerGeo, playerMat);
        Player.position.z = 1;
        Player.castShadow = true;
        Player.receiveShadow = true;
        
        Player.userData.controllable = true;
        Player.userData.test = this.test;
                
    },
    
    test: function () {
        return Player.position.x;
    }
    
};
