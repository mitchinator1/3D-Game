var HUD, e, Player, player, blockW, blockD, Camera, Grid, pointLight, ctx, lastTs, timeDelta, movementSpeed, ESwitch = false, mainCam;

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
        if (this.AKey && Player.controllable && !this.DKey) {
            
            if (!Grid.hitDetect()) {
                player.position.x -= movementSpeed;
            }
            if (player.position.x < Camera.maxX - (Camera.padX * blockW) || Grid.hitDetect()) {
                Camera.control.move(-movementSpeed, 0);
            }
            if (player.position.x < Camera.minX * Camera.padX || Grid.hitDetect()) {
                Camera.control.move(movementSpeed, 0);
            }
            if (Grid.hitDetect()) {
                player.position.x += movementSpeed;
            }
            
        }
        
        //Right Direction
        if (this.DKey && Player.controllable && !this.AKey) {
            
            if (!Grid.hitDetect()) {
                player.position.x += movementSpeed;
            }
            if (player.position.x > Camera.minX * Camera.padX || Grid.hitDetect()) {
                Camera.control.move(movementSpeed, 0);
            }
            if (player.position.x > Camera.maxX - (Camera.padX * blockW) || Grid.hitDetect()) {
                Camera.control.move(-movementSpeed, 0);
            }
            if (Grid.hitDetect()) {
                player.position.x -= movementSpeed;
            }
            
        }
        
        //Up Direction
        if (this.WKey && Player.controllable && !this.SKey) {
            
            if (!Grid.hitDetect()) {
                player.position.y += movementSpeed;
            }
            if (player.position.y > Camera.minY * Camera.padY || Grid.hitDetect()) {
                Camera.control.move(0, movementSpeed);
            }
            if (player.position.y > Camera.maxY - (Camera.padY * blockD) || Grid.hitDetect()) {
                Camera.control.move(0, -movementSpeed);
            }
            if (Grid.hitDetect()) {
                player.position.y -= movementSpeed;
            }
            
        }
        
        //Down Direction
        if (this.SKey && Player.controllable && !this.WKey) {
            
            if (!Grid.hitDetect()) {
                player.position.y -= movementSpeed;
            }
            if (player.position.y < Camera.maxY - (Camera.padY * blockD) || Grid.hitDetect()) {
                Camera.control.move(0, -movementSpeed);
            }
            if (player.position.y < Camera.minY * Camera.padY || Grid.hitDetect()) {
                Camera.control.move(0, movementSpeed);
            }
            if (Grid.hitDetect()) {
                player.position.y += movementSpeed;
            }
            
        }

        if (this.LArrowKey) {
            mainCam.rotation.y += 0.01;
        }

        if (this.RArrowKey) {
            mainCam.rotation.y -= 0.01;
        }

        if (this.UArrowKey) {
            pointLight.position.y += 0.2;
            pointLight.position.z -= 0.1;
            
            if (HUD.heartCount < 20) {
                HUD.health(true, 1);
            }
            
        }

        if (this.DArrowKey) {
            pointLight.position.y -= 0.2;
            pointLight.position.z += 0.1;
            
            if (HUD.heartCount > 4) {
                HUD.health(true, -1);
            }
            
        }

        if (this.QKey && HUD.refreshScreen) {
            Camera.transition.fadeIn(ctx);
        }
        
        //Inventory switch on E Key
        if (this.EKey && !ESwitch) {
            
            if (!HUD.showInventory) {
                HUD.showInventory = true;
                Player.controllable = false;
            } else {
                HUD.showInventory = false;
                Player.controllable = true;
            }
            ESwitch = true;
        }
        
        if (!this.EKey && ESwitch) {
            ESwitch = false;
        }
        
    }
    
};

document.addEventListener("keydown", function (e) {'use strict'; Input.handleKeyEvent(e, true); });
document.addEventListener("keyup", function (e) {'use strict'; Input.handleKeyEvent(e, false); });
