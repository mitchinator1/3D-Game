var hud, input, e, player, blockW, blockD, camera, grid, pointLight, ctx, lastTs, timeDelta, movementSpeed, ESwitch = false, mainCam;

var Input =  {

    init: function () {
        'use strict';
        
        this.AKey = false;
        this.DKey = false;
        this.WKey = false;
        this.SKey = false;
        this.SpaceKey = false;
        this.LArrowKey = false;
        this.RArrowKey = false;
        this.UArrowKey = false;
        this.DArrowKey = false;
        this.QKey = false;
        this.EKey = false;
        
    },
    
    handleKeyEvent: function (e, isKeyDown) {
        'use strict';
        
        //Left - A Key
        if (e.keyCode === 65) {
            this.AKey = isKeyDown;
        }
        //Right - D Key
        if (e.keyCode === 68) {
            this.DKey = isKeyDown;
        }
        //Up - W Key
        if (e.keyCode === 87) {
            this.WKey = isKeyDown;
        }
        //Down - S Key
        if (e.keyCode === 83) {
            this.SKey = isKeyDown;
        }
        //Space Key
        if (e.keyCode === 32) {
            this.SpaceKey = isKeyDown;
        }
        //Left Arrow Key
        if (e.keyCode === 37) {
            this.LArrowKey = isKeyDown;
        }
        //Right Arrow Key
        if (e.keyCode === 39) {
            this.RArrowKey = isKeyDown;
        }
        //Up Arrow Key
        if (e.keyCode === 38) {
            this.UArrowKey = isKeyDown;
        }
        //Down Arrow Key
        if (e.keyCode === 40) {
            this.DArrowKey = isKeyDown;
        }
        //Q Key
        if (e.keyCode === 81) {
            this.QKey = isKeyDown;
        }
        //E Key
        if (e.keyCode === 69) {
            this.EKey = isKeyDown;
        }
    },
    
    movement: function (ts) {
        'use strict';
        
        timeDelta = (ts - lastTs) / 1000;
        lastTs = ts;

        movementSpeed = 5 * timeDelta;
        
        //Left Direction
        if (input.AKey && player.controllable && !input.DKey) {
            
            if (!grid.hitDetect()) {
                player.position.x -= movementSpeed;
            }
            if (player.position.x < camera.maxX - (camera.padX * blockW) || grid.hitDetect()) {
                camera.control.move(-movementSpeed, 0);
            }
            if (player.position.x < camera.minX * camera.padX || grid.hitDetect()) {
                camera.control.move(movementSpeed, 0);
            }
            if (grid.hitDetect()) {
                player.position.x += movementSpeed;
            }
            
        }
        
        //Right Direction
        if (input.DKey && player.controllable && !input.AKey) {
            
            if (!grid.hitDetect()) {
                player.position.x += movementSpeed;
            }
            if (player.position.x > camera.minX * camera.padX || grid.hitDetect()) {
                camera.control.move(movementSpeed, 0);
            }
            if (player.position.x > camera.maxX - (camera.padX * blockW) || grid.hitDetect()) {
                camera.control.move(-movementSpeed, 0);
            }
            if (grid.hitDetect()) {
                player.position.x -= movementSpeed;
            }
            
        }
        
        //Up Direction
        if (input.WKey && player.controllable && !input.SKey) {
            
            if (!grid.hitDetect()) {
                player.position.y += movementSpeed;
            }
            if (player.position.y > camera.minY * camera.padY || grid.hitDetect()) {
                camera.control.move(0, movementSpeed);
            }
            if (player.position.y > camera.maxY - (camera.padY * blockD) || grid.hitDetect()) {
                camera.control.move(0, -movementSpeed);
            }
            if (grid.hitDetect()) {
                player.position.y -= movementSpeed;
            }
            
        }
        
        //Down Direction
        if (input.SKey && player.controllable && !input.WKey) {
            
            if (!grid.hitDetect()) {
                player.position.y -= movementSpeed;
            }
            if (player.position.y < camera.maxY - (camera.padY * blockD) || grid.hitDetect()) {
                camera.control.move(0, -movementSpeed);
            }
            if (player.position.y < camera.minY * camera.padY || grid.hitDetect()) {
                camera.control.move(0, movementSpeed);
            }
            if (grid.hitDetect()) {
                player.position.y += movementSpeed;
            }
            
        }

        if (input.LArrowKey) {
            mainCam.rotation.y += 0.01;
        }

        if (input.RArrowKey) {
            mainCam.rotation.y -= 0.01;
        }

        if (input.UArrowKey) {
            pointLight.position.y += 0.2;
            pointLight.position.z -= 0.1;
            
            if (hud.heartCount < 20) {
                hud.health(true, 1);
            }
            
        }

        if (input.DArrowKey) {
            pointLight.position.y -= 0.2;
            pointLight.position.z += 0.1;
            
            if (hud.heartCount > 4) {
                hud.health(true, -1);
            }
            
        }

        if (input.QKey && hud.refreshScreen) {
            camera.transition.fadeIn(ctx);
        }
        
        //Inventory switch on E Key
        if (input.EKey && !ESwitch) {
            
            if (!hud.showInventory) {
                hud.showInventory = true;
                player.controllable = false;
            } else {
                hud.showInventory = false;
                player.controllable = true;
            }
            ESwitch = true;
        }
        
        if (!input.EKey && ESwitch) {
            ESwitch = false;
        }
        
    }
    
};

document.addEventListener("keydown", function (e) {'use strict'; input.handleKeyEvent(e, true); });
document.addEventListener("keyup", function (e) {'use strict'; input.handleKeyEvent(e, false); });