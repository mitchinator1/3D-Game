var blockW, blockD, blockH,
    THREE, scene, Player, Camera, Lighting, ctx, canvas, HUD, Storage, mapGrid, currentGrid = [];

var standardGeo = new THREE.BoxBufferGeometry(blockW, blockD, blockH);

console.log("4:12");

var Grid = {
    
    init: function () {
        'use strict';
        
        this.X = 0;
        this.Y = 0;
        this.setOverworldLocation(this.location);

    },
    
    setOverworldLocation: function (mapLocation) {
        'use strict';
        this.remove();
        this.location = mapLocation;
        
        if (this.location === "Overworld") {
            this.X = 0;
            this.Y = 0;
            Camera.padX = 4;
            Camera.padY = 4;
            Lighting.fog(0x000000, 5);
            this.readGrid();
            
            if (this.previousLocation === "Dungeon 1") {

                Player.userData.setPosition("overworld");
                
            } else if (this.previousLocation === "Dungeon 2") {

                Player.userData.setPosition("overworld");
                
            } else {
                
                Player.userData.setPosition("exact", 18, 8);
            
            }

        }
        
        if (this.location === "Dungeon 1") {
            this.X = 1;
            this.Y = 0;
            Camera.padX = 3;
            Camera.padY = 4;
            Lighting.fog(0x000000, 30);
            this.readGrid();

            Player.userData.setPosition("south");

        }
        
        if (this.location === "Dungeon 2") {
            this.X = 0;
            this.Y = 0;
            Camera.padX = 3;
            Camera.padY = 4;
            Lighting.fog(0x000000, 45);
            this.readGrid();

            Player.userData.setPosition("south");

        }
        
        if (this.location === undefined) {
            
            this.location = "Overworld";
            this.X = 0;
            this.Y = 0;
            Camera.padX = 4;
            Camera.padY = 5;
            this.readGrid();
            Player.userData.setPosition("exact", 26, 8);
            
        }
        
        Camera.transition.fadeIn(ctx, true);
        Camera.setPosition(Camera.padX, Camera.padY);
        Storage.save();

    },
    
    setDungeonLocation: function () {
        'use strict';
        //this.remove();

        if (Player.position.x > (currentGrid[0].length - 1) * blockW - 3) {
            this.remove();
            this.X += 1;
            this.readGrid();
            Player.userData.setPosition("west");
            
        } else if (Player.position.x < blockW + 1) {
            this.remove();
            this.X -= 1;
            this.readGrid();
            Player.userData.setPosition("east");
            
        } else if (Player.position.y > (currentGrid.length - 1) * blockD - 3) {
            this.remove();
            this.Y += 1;
            this.readGrid();
            Player.userData.setPosition("south");
            
        } else if (Player.position.y < blockD + 1) {
            this.remove();
            this.Y -= 1;
            this.readGrid();
            Player.userData.setPosition("north");
            
        }
        
        Camera.transition.fadeIn(ctx, false);
        
    },
    
    remove: function () {
        'use strict';
        var i, j;
        
        for (i = 0; i < currentGrid.length; i += 1) {

            for (j = 0; j < currentGrid[i].length; j += 1) {
                
                scene.remove(currentGrid[i][j]);
                
            }
        }
        
        currentGrid = [];
        
    },

    hitDetect: function (specific) {
        'use strict';
        var block, hitPad, i, j;
    
        for (i = 0; i < currentGrid.length; i += 1) {
            for (j = 0; j < currentGrid[i].length; j += 1) {

                block = currentGrid[i][j];
                hitPad = block.userData.hitPad;
                
                if (this.blockCheck(Player.position.x, Player.position.y, block.position.x, block.position.y, hitPad)) {
                    
                    if (block.userData.set === "Wall") {
                        return true;
                    }
                    
                    if (block.userData.set === "Interactable") {
                        this.hitDetect.interactable = true;
                        this.hitDetect.data = block;
                        return true;
                    } else {
                        this.hitDetect.interactable = false;
                        this.hitDetect.data = "";
                    }
                    
                    if (block.userData.set === "Door") {
                        if (!block.userData.locked) {
                            this.previousLocation = this.location;

                            if (this.location === block.userData.enterLink) {
                                this.setOverworldLocation(block.userData.exitLink);
                            } else if (this.location === block.userData.exitLink) {
                                this.setOverworldLocation(block.userData.enterLink);
                            }

                            if (block.userData.link === "Inside") {
                                this.setDungeonLocation();
                            }

                            return true;
                             
                        }
                        if (block.userData.locked) {
                            this.hitDetect.interactable = true;
                            this.hitDetect.data = block;
                        } else {
                            this.hitDetect.interactable = false;
                            this.hitDetect.data = "";
                        }
                        
                        return true;
                        
                    }
                    
                }

            }
        }
        
    },
    
    blockCheck: function (pX, pY, bX, bY, pad) {
        'use strict';
        
        if (pX + pad > bX - (blockW / 2) && pX - pad < bX + (blockW / 2) && pY + pad > bY - (blockD / 2) && pY - pad < bY + (blockD / 2)) {
            return true;
        }
        
    },
    
    readGrid: function () {
        'use strict';
        var i, j, src, setSrc, typeSrc, dataSrc, parsed;
        
        currentGrid = mapGrid[this.location][this.floor][this.Y][this.X].slice();
        console.time('renderTime');
        for (i = 0; i < currentGrid.length; i += 1) {
            for (j = 0; j < currentGrid[i].length; j += 1) {
                
                if (currentGrid[i][j].userData === undefined) {
                    
                    src = ("000000000000000" + currentGrid[i][j].toString(2)).slice(-16);
                    setSrc = parseInt(src.slice(0, 2), 2);
                    typeSrc = parseInt(src.slice(2, 7), 2);
                    dataSrc = parseInt(src.slice(7), 2);
                    parsed = this.parseSet(setSrc, typeSrc, dataSrc);

                    currentGrid[i][j] = new THREE.Mesh(parsed.geometry, parsed.material);
                
                    currentGrid[i][j].userData = parsed;
                    currentGrid[i][j].userData.geometry = "";
                    currentGrid[i][j].userData.material = "";

                    currentGrid[i][j].position.x = j * blockW;
                    currentGrid[i][j].position.y = (currentGrid.length - 1 - i) * blockD;
                    currentGrid[i][j].position.z = parsed.z || 0;
                
                    currentGrid[i][j].castShadow = parsed.castShadow || false;
                    currentGrid[i][j].receiveShadow = parsed.receiveShadow || false;
                    
                }

                scene.add(currentGrid[i][j]);
                
            }
        }
        
        console.timeEnd('renderTime');
        
    },
    
    parseSet: function (setSrc, typeSrc, dataSrc) {
        'use strict';
        var block;
        
        switch (setSrc) {
        case 0:
            block = { set: "Passable", hit: false };
            break;
        case 1:
            block = { set: "Wall", hit: true };
            break;
        case 2:
            block = { set: "Interactable", hit: true };
            break;
        case 3:
            block = { set: "Door", hit: true };
            break;
        }
        
        return this.parseType(block, typeSrc, dataSrc);
        
    },
    
    parseType: function (block, typeSrc, dataSrc) {
        'use strict';
        
        if (block.set === "Passable") {
            switch (typeSrc) {
            case 0: //Grass
                //block.geometry = new THREE.BoxGeometry(blockW, blockD, 0.01);
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, 0.01);
                block.material = new THREE.MeshLambertMaterial({ color: 0x33aa00 });
                block.hitPad = 0;
                block.receiveShadow = true;
                break;
            case 1: //Shrub
                //block.geometry = new THREE.BoxGeometry(blockW, blockD, blockH);
                block.geometry = standardGeo;
                block.material = new THREE.MeshLambertMaterial({ color: 0x119922 });
                block.hitPad = 0;
                block.z = 1;
                block.castShadow = true;
                block.receiveShadow = true;
                break;
            case 2: //Leaves
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, blockH / 2);
                block.material = new THREE.MeshLambertMaterial({ color: 0x229911 });
                block.hitPad = 0;
                block.castShadow = true;
                block.z = 4;
                break;
            default:
                block.geometry = new THREE.BoxBufferGeometry(blockW / 2, blockD, blockH * 5);
                block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                block.hitPad = 1;
                break;
            }
        }
        
        if (block.set === "Wall") {
            switch (typeSrc) {
            case 0:
                //block.geometry = new THREE.BoxGeometry(blockW, blockD, blockH * 2);
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, blockH * 2);
                block.material = new THREE.MeshLambertMaterial({ color: 0xddaa55 });
                block.hitPad = 0.9;
                block.z = 1;
                block.castShadow = true;
                break;
            case 1:
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, blockH * 3.5);
                block.material = new THREE.MeshLambertMaterial({ color: 0xcc8855 });
                block.hitPad = 0.9;
                block.z = 1;
                block.castShadow = true;
                block.receiveShadow = true;
                break;
            default:
                block.geometry = new THREE.BoxBufferGeometry(blockW / 2, blockD / 2, blockH * 5);
                block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                block.hitPad = 1;
                break;
            }
        }
        
        if (block.set === "Interactable") {
            switch (typeSrc) {
            case 0:
                //block.geometry = new THREE.BoxGeometry(blockW, blockD, blockH);
                block.geometry = standardGeo;
                block.material = new THREE.MeshLambertMaterial({ color: 0xddaa00 });
                block.hitPad = 0.9;
                block.z = 0.5;
                block.type = "Chest";
                break;
            case 1:
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, blockH / 2);
                block.material = new THREE.MeshLambertMaterial({ color: 0xdddd55 });
                block.hitPad = 0.9;
                block.z = 0.5;
                block.type = "Sign";
                break;
            default:
                block.geometry = new THREE.BoxBufferGeometry(blockW / 2, blockD / 2, blockH * 5);
                block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                block.hitPad = 0.9;
                break;
            }
        }
        
        if (block.set === "Door") {
            switch (typeSrc) {
            case 0: //Standard Door
                block.geometry = new THREE.BoxBufferGeometry(blockW, blockD, 0.01);
                block.material = new THREE.MeshLambertMaterial({ color: 0x000000 });
                block.hitPad = 0.2;
                block.z = 0;
                break;
            case 1: //Vertical Locked Door
                block.geometry = new THREE.BoxGeometry(blockW / 4, blockD, blockH * 2);
                block.material = new THREE.MeshLambertMaterial({ color: 0xddaa55 });
                block.hitPad = 0.2;
                block.z = 1;
                block.locked = true;
                block.type = "Locked Door";
                break;
            case 2: //Horizontal Locked Door
                block.geometry = new THREE.BoxGeometry(blockW / 4, blockD, blockH * 2);
                block.material = new THREE.MeshLambertMaterial({ color: 0xddaa55 });
                block.hitPad = 0.2;
                block.z = 1;
                block.locked = true;
                block.type = "Locked Door";
                break;
            default:
                block.geometry = new THREE.BoxBufferGeometry(blockW / 2, blockD / 2, blockH * 5);
                block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                block.hitPad = 1;
                block.z = 0;
                break;
            }
        }

        return this.parseData(block, dataSrc);
        
    },
    
    parseData: function (block, dataSrc) {
        'use strict';
        
        if (block.set === "Door") {
            switch (dataSrc) {
            case 0:
                block.link = "Inside";
                break;
            case 1:
                block.enterLink = "Dungeon 1";
                block.exitLink = "Overworld";
                break;
            case 2:
                block.enterLink = "Dungeon 2";
                block.exitLink = "Overworld";
                break;
            default:
                block.enterLink = "Overworld";
                block.exitLink = "Overworld";
                break;
            }
        }
        
        if (block.set === "Interactable") {
            
            if (block.type === "Chest") {
                switch (dataSrc) {
                case 0:
                    block.contents = {heart: 1};
                    break;
                case 1:
                    block.contents = {key: 1};
                    break;
                }
                
                block.opened = false;
                
            }
            
            if (block.type === "Sign") {
                switch (dataSrc) {
                case 0:
                    block.contents = {message: "Welcome to the first dungeon."};
                    break;
                case 1:
                    block.contents = {message: "Welcome to the second dungeon."};
                    break;
                }
            }
            
        }
        
        return block;
        
    }
        
};
