var THREE, scene, pointLight, ambLight;

var Lighting = {
    
    init: function (fog) {
        'use strict';
        this.fog(fog);
        
        pointLight = new THREE.PointLight(0xffffff, 1, 140);
        pointLight.position.set(20, -10, 30);
        pointLight.castShadow = true;

        ambLight = new THREE.AmbientLight(0xdddddd);
        ambLight.position.x = 20;
        ambLight.position.y = 20;
        
    },
    
    fog: function (fog, shade) {
        'use strict';
        var colour = shade || 0x000000;
        
        scene.fog = new THREE.FogExp2(colour, (fog / 1000));
        
    }
    
};
