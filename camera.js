var THREE, mainCam, movementSpeed, hud, canvas, player;

var Camera = {
    
    init: function (cam, startX, startY, startZ) {
        'use strict';
        this.startX = startX;
        this.startY = startY;
        this.startZ = startZ;
        
        this.minX = blockW;
        this.minY = blockD;
        this.maxX = 0;
        this.maxY = 0;
        
        if (cam === "mainCam") {
            mainCam = new THREE.PerspectiveCamera(75, 900 / 700, 0.1, 1000);
            mainCam.position.z = this.startZ;
            mainCam.position.x = player.position.x;
            mainCam.lookAt(new THREE.Vector3(player.position.x, this.startY, 0));
        }
        
    },
    
    control: {
        
        set: function (x, y) {
            'use strict';
            mainCam.position.x = x;
            mainCam.position.y = y;
        },
        
        move: function (x, y) {
            'use strict';
            mainCam.position.x += x;
            mainCam.position.y += y;
        }
        
    },
    
    transition: {
        
        fadeIn: function (ctx) {
            hud.showInventory = false;
            hud.showHud = false;
            hud.refreshScreen = false;
            player.controllable = false;
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            var opac = 0;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var fade = setInterval(fadein, 6);
            function fadein() {
                if (opac >= 1) {
                    hud.refreshScreen = true;
                    hud.showHud = true;
                    player.controllable = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    clearInterval(fade);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0, 0, 0,' + (1 - opac) + ')';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.closePath();
                    opac += 0.01;
                }
            }
        },
        
        fadeOut: function (ctx) {
            hud.showInventory = false;
            hud.showHud = false;
            hud.refreshScreen = false;
            player.controllable = false;
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
            var opac = 0;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var fadeOut = setInterval(fadeout, 6);
            function fadeout() {

                if (opac >= 1) {
                    hud.refreshScreen = true;
                    hud.showHud = true;
                    player.controllable = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    clearInterval(fadeOut);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.fillStyle = 'rgba(0, 0, 0,' + (opac) + ')';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.closePath();
                    opac += 0.01;
                }

            }
        }
    
    }
    
};
