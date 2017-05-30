var pointLight, ambLight;

var Lighting = {
    
    init: function () {
        
        pointLight = new THREE.PointLight(0xffffff, 1, 140);
        pointLight.position.set(20, -10, 30);
        pointLight.castShadow = true;

        ambLight = new THREE.AmbientLight(0xdddddd);
        ambLight.position.x = 20;
        ambLight.position.y = 20;
        
    }
    
}