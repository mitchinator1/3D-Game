var HUD, Player, Camera, Grid, Storage,
    ctx, lastTs, timeDelta, movementSpeed,
    blockW, blockD, blockH, mainCam, pointLight;

var Input =  {

    init: function () {
        'use strict';
        
        this.AKey = false;
        this.DKey = false;
        this.WKey = false;
        this.SKey = false;
        this.LArrowKey = false;
        this.RArrowKey = false;
        this.UArrowKey = false;
        this.DArrowKey = false;
        this.QKey = false;

        this.EKey = {down: false,
                     toggle: false};
        this.SpaceKey = {down: false,
                        toggle: false};
        
    },
    
    handleKeyEvent: function (e, keyPress) {
        'use strict';
        
        //Left - A Key
        if (e.keyCode === 65) {
            this.AKey = keyPress;
        }
        //Right - D Key
        if (e.keyCode === 68) {
            this.DKey = keyPress;
        }
        //Up - W Key
        if (e.keyCode === 87) {
            this.WKey = keyPress;
        }
        //Down - S Key
        if (e.keyCode === 83) {
            this.SKey = keyPress;
        }
        //Space Key
        if (e.keyCode === 32) {
            this.SpaceKey.down = keyPress;
        }
        //Left Arrow Key
        if (e.keyCode === 37) {
            this.LArrowKey = keyPress;
        }
        //Right Arrow Key
        if (e.keyCode === 39) {
            this.RArrowKey = keyPress;
        }
        //Up Arrow Key
        if (e.keyCode === 38) {
            this.UArrowKey = keyPress;
        }
        //Down Arrow Key
        if (e.keyCode === 40) {
            this.DArrowKey = keyPress;
        }
        //Q Key
        if (e.keyCode === 81) {
            this.QKey = keyPress;
        }
        //E Key
        if (e.keyCode === 69) {
            this.EKey.down = keyPress;
        }
    },
    
    movement: function (ts) {
        'use strict';
        
        timeDelta = (ts - lastTs) / 1000;
        lastTs = ts;

        movementSpeed = 5 * timeDelta;
        
        //Left Direction
        if (this.AKey && Player.userData.controllable && !this.DKey) {
            
            //if (!Grid.hitDetect()) {
            Player.position.x -= movementSpeed;
            //}
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
            
            //if (!Grid.hitDetect()) {
            Player.position.x += movementSpeed;
            //}
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
            
            //if (!Grid.hitDetect()) {
            Player.position.y += movementSpeed;
            //}
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
            
            //if (!Grid.hitDetect()) {
            Player.position.y -= movementSpeed;
            //}
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
        }

        if (this.DArrowKey) {
            pointLight.position.y -= 0.2;
            pointLight.position.z += 0.1;
            
            HUD.health(true, -1);
            
        }

        if (this.QKey && HUD.refreshScreen) {
            Camera.transition.fadeIn(ctx);
            Storage.clear();
        }
        
        //Inventory switch on E Key
        if (this.EKey.down && !this.EKey.toggle) {
            
            if (!HUD.showInventory && Player.userData.controllable) {
                
                HUD.showInventory = true;
                Player.userData.controllable = false;
                
            } else {
                
                HUD.showInventory = false;
                Player.userData.controllable = true;
                
            }
            
            this.EKey.toggle = true;
            
        }
        
        if (!this.EKey.down && this.EKey.toggle) {
            this.EKey.toggle = false;
        }
        
        //Interaction button
        if (this.SpaceKey.down && !this.SpaceKey.toggle) {
            var interact;
            this.SpaceKey.toggle = true;
            
            if (Grid.hitDetect.interactable) {
                
                if (!Player.userData.controllable) {
                    Player.userData.controllable = true;
                    HUD.setRefreshArea("Full");
                }

                interact = Grid.hitDetect.data;

                if (Player.userData.controllable) {
                    
                    if (interact.userData.type === "Chest") {
                        if (interact.userData.opened === false) {
                            Player.userData.controllable = false;

                            if (interact.userData.contents.heart > 0) {
                                HUD.displayText("You found a Heart", true);
                                HUD.health(true, interact.userData.contents.heart);
                            }

                            if (interact.userData.contents.coins > 0) {
                                HUD.displayText("You found " + interact.contents.coins + " coins", true);
                                HUD.currency(interact.contents.coins);
                            }
                            
                            if (interact.userData.contents.key > 0) {
                                HUD.displayText("You found " + interact.userData.contents.key + " key", true);
                                HUD.keyCount += 1;
                            }

                            if (interact.userData.contents.item !== undefined) {
                                HUD.displayText("You found a " + interact.userData.item, true);
                            }
                    
                            interact.userData.opened = true;
                    
                        } else {
                            Player.userData.controllable = true;
                            HUD.setRefreshArea("True");
                        }
                    }
                
                    if (interact.userData.type === "Sign") {
                        
                        if (!Player.userData.reading) {
                            
                            Player.userData.controllable = false;
                            Player.userData.reading = true;
                            HUD.displayText(interact.userData.contents.message, true);
                            
                        } else {
                            
                            Player.userData.controllable = true;
                            Player.userData.reading = false;
                            HUD.setRefreshArea("Full");
                            
                        }
                        
                    }
                    
                    if (interact.userData.type === "Locked Door") {
                        
                        if (interact.userData.locked && HUD.keyCount > 0) {
                            interact.userData.locked = false;
                            HUD.keyCount -= 1;
                            interact.position.z = -blockH + 0.1;
                        }
                        
                    }

                }

            }
            
        }
        
        if (!this.SpaceKey.down && this.SpaceKey.toggle) {
            this.SpaceKey.toggle = false;
        }
        
    }
    
};

document.addEventListener("keydown", function (e) {'use strict'; Input.handleKeyEvent(e, true); });
document.addEventListener("keyup", function (e) {'use strict'; Input.handleKeyEvent(e, false); });