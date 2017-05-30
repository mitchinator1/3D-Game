var player, THREE, playerGeo, playerMat;

var Player = {
    
    init: function () {

        player = new THREE.Mesh(playerGeo, playerMat);
        player.position.z = 1;
        player.castShadow = true;
        player.receiveShadow = true;
        
    }
    
};