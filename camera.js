var THREE, mainCam, hud, canvas, player, grid, mapGrid, blockW, blockD;

var Camera = {
    
    init: function (cam, startY, startZ) {
        'use strict';
        this.startY = startY;
        this.startZ = startZ;
        
        this.currentCamera = cam;
        
        this.minX = blockW;
        this.minY = blockD;
        this.maxX = 0;
        this.maxY = 0;
        
        this.offsetY = -8;
        
        this.padX = 0;
        this.padY = 0;
        
        if (this.currentCamera === "mainCam") {
            mainCam = new THREE.PerspectiveCamera(75, 900 / 700, 0.1, 1000);
            mainCam.position.z = this.startZ;
            mainCam.lookAt(new THREE.Vector3(player.position.x, this.startY, 0));
        }
        
    },
    
    setPosition: function (padX, padY) {
        'use strict';
        var maxX = 0, i,
            maxY = (mapGrid[grid.location][grid.floor][grid.gridY][grid.gridX].length - 1) * blockD;
        
        for (i = 0; i < mapGrid[grid.location][grid.floor][grid.gridY][grid.gridX].length; i += 1) {
            if (maxX < (mapGrid[grid.location][grid.floor][grid.gridY][grid.gridX][i].length - 1) * blockW) {
                maxX = (mapGrid[grid.location][grid.floor][grid.gridY][grid.gridX][i].length - 1) * blockW;
            }
        }
        
        
        if (player.position.x < blockW * padX) {
            mainCam.position.x = padX * blockW;
        } else if (player.position.x > maxX - (padX * blockW)) {
            mainCam.position.x = maxX - (padX * blockW);
        } else {
            mainCam.position.x = player.position.x;
        }
        
        if (player.position.y < blockD * padY) {
            mainCam.position.y = (padY * blockD) + this.offsetY;
        } else if (player.position.y > maxY - (padY * blockD)) {
            mainCam.position.y = maxY - (padY * blockD) + this.offsetY;
        } else {
            mainCam.position.y = player.position.y + this.offsetY;
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
            'use strict';
            var opac = 1, fadeIn;
            
            hud.showInventory = false;
            hud.showHud = false;
            hud.refreshScreen = false;
            player.controllable = false;
            
            ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            function fadein() {
                
                if (opac <= 0) {
                    hud.refreshScreen = true;
                    player.controllable = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    clearInterval(fadeIn);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    opac -= 0.015;
                }
                if (opac <= 0.1) {
                    hud.showHud = true;
                }
                
            }
            
            fadeIn = setInterval(fadein, 5);
            
        },
        
        fadeOut: function (ctx) {
            'use strict';
            var opac = 0, fadeOut;
            
            hud.showInventory = false;
            hud.showHud = false;
            hud.refreshScreen = false;
            player.controllable = false;
            
            ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
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
                    ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.closePath();
                    opac += 0.01;
                }

            }
            
            fadeOut = setInterval(fadeout, 5);
            
        }
    
    }
    
};