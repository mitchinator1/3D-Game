var HUD, Player, Camera, Grid, Storage,
    ctx, lastTs, timeDelta, movementSpeed, e, ESwitch = false,
    blockW, blockD, mainCam, pointLight;

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
        if (this.AKey && Player.userData.controllable && !this.DKey) {
            
            if (!Grid.hitDetect()) {
                Player.position.x -= movementSpeed;
            }
            if (Player.position.x < Camera.maxX - (Camera.padX * blockW) || Grid.hitDetect()) {
                Camera.control.move(-movementSpeed, 0);
            }
            if (Player.position.x < Camera.minX * Camera.padX || Grid.hitDetect()) {
                Camera.control.move(movementSpeed, 0);
            }
            if (Grid.hitDetect()) {
                Player.position.x += movementSpeed;
            }
            
        }
        
        //Right Direction
        if (this.DKey && Player.userData.controllable && !this.AKey) {
            
            if (!Grid.hitDetect()) {
                Player.position.x += movementSpeed;
            }
            if (Player.position.x > Camera.minX * Camera.padX || Grid.hitDetect()) {
                Camera.control.move(movementSpeed, 0);
            }
            if (Player.position.x > Camera.maxX - (Camera.padX * blockW) || Grid.hitDetect()) {
                Camera.control.move(-movementSpeed, 0);
            }
            if (Grid.hitDetect()) {
                Player.position.x -= movementSpeed;
            }
            
        }
        
        //Up Direction
        if (this.WKey && Player.userData.controllable && !this.SKey) {
            
            if (!Grid.hitDetect()) {
                Player.position.y += movementSpeed;
            }
            if (Player.position.y > Camera.minY * Camera.padY || Grid.hitDetect()) {
                Camera.control.move(0, movementSpeed);
            }
            if (Player.position.y > Camera.maxY - (Camera.padY * blockD) || Grid.hitDetect()) {
                Camera.control.move(0, -movementSpeed);
            }
            if (Grid.hitDetect()) {
                Player.position.y -= movementSpeed;
            }
            
        }
        
        //Down Direction
        if (this.SKey && Player.userData.controllable && !this.WKey) {
            
            if (!Grid.hitDetect()) {
                Player.position.y -= movementSpeed;
            }
            if (Player.position.y < Camera.maxY - (Camera.padY * blockD) || Grid.hitDetect()) {
                Camera.control.move(0, -movementSpeed);
            }
            if (Player.position.y < Camera.minY * Camera.padY || Grid.hitDetect()) {
                Camera.control.move(0, movementSpeed);
            }
            if (Grid.hitDetect()) {
                Player.position.y += movementSpeed;
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
            Storage.clear();
        }
        
        //Inventory switch on E Key
        if (this.EKey && !ESwitch) {
            
            if (!HUD.showInventory) {
                HUD.showInventory = true;
                Player.userData.controllable = false;
            } else {
                HUD.showInventory = false;
                Player.userData.controllable = true;
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
