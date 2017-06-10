var THREE, mainCam, HUD, canvas, Player, Grid, mapGrid, blockW, blockD;

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
            mainCam.lookAt(new THREE.Vector3(Player.position.x, this.startY, 0));
        }
        
    },
    
    setPosition: function (padX, padY) {
        'use strict';
        var i;
        
        this.maxY = (mapGrid[Grid.location][Grid.floor][Grid.gridY][Grid.gridX].length - 1) * blockD;
        this.maxX = 0;
        
        for (i = 0; i < mapGrid[Grid.location][Grid.floor][Grid.gridY][Grid.gridX].length; i += 1) {
            if (this.maxX < (mapGrid[Grid.location][Grid.floor][Grid.gridY][Grid.gridX][i].length - 1) * blockW) {
                this.maxX = (mapGrid[Grid.location][Grid.floor][Grid.gridY][Grid.gridX][i].length - 1) * blockW;
            }
        }
        
        
        if (Player.position.x < blockW * padX) {
            mainCam.position.x = padX * blockW;
        } else if (Player.position.x > this.maxX - (padX * blockW)) {
            mainCam.position.x = this.maxX - (padX * blockW);
        } else {
            mainCam.position.x = Player.position.x;
        }
        
        if (Player.position.y < blockD * padY) {
            mainCam.position.y = (padY * blockD) + this.offsetY;
        } else if (Player.position.y > this.maxY - (padY * blockD)) {
            mainCam.position.y = this.maxY - (padY * blockD) + this.offsetY;
        } else {
            mainCam.position.y = Player.position.y + this.offsetY;
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
            
            HUD.showInventory = false;
            HUD.showHud = false;
            HUD.refreshScreen = false;
            Player.userData.controllable = false;
            
            ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            function fadein() {
                
                if (opac <= 0) {
                    HUD.refreshScreen = true;
                    Player.userData.controllable = true;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    clearInterval(fadeIn);
                } else {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    opac -= 0.015;
                }
                if (opac <= 0.1) {
                    HUD.showHud = true;
                }
                
            }
            
            fadeIn = setInterval(fadein, 5);
            
        },
        
        fadeOut: function (ctx) {
            'use strict';
            var opac = 0, fadeOut;
            
            HUD.showInventory = false;
            HUD.showHud = false;
            HUD.refreshScreen = false;
            Player.userData.controllable = false;
            
            ctx.fillStyle = 'rgba(0, 0, 0,' + opac + ')';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            function fadeout() {

                if (opac >= 1) {
                    HUD.refreshScreen = true;
                    HUD.showHud = true;
                    Player.userData.controllable = true;
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
