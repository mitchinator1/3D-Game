var blockW, blockD, blockGeos, blockMats,
    THREE, scene, Player, Camera, Lighting, ctx, canvas, HUD, Storage, mapGrid;

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
            this.render();
            
            if (this.previousLocation === "Dungeon 1") {

                Player.userData.setPosition("overworld", 3);
                
            } else if (this.previousLocation === "Dungeon 2") {

                Player.userData.setPosition("overworld", 4);
                
            } else {
                
                Player.userData.setPosition("exact", 14, 8);
            
            }

        } else if (this.location === "Dungeon 1") {
            this.X = 1;
            this.Y = 0;
            Camera.padX = 3;
            Camera.padY = 4;
            Lighting.fog(0x000000, 30);
            this.render();
            
            if (this.previousLocation === "Overworld") {
                
                Player.userData.setPosition("south");
                
            } else {
                
                Player.userData.setPosition("south");
                
            }
            

        } else if (this.location === "Dungeon 2") {
            this.X = 0;
            this.Y = 0;
            Camera.padX = 3;
            Camera.padY = 4;
            Lighting.fog(0x000000, 45);
            this.render();

            if (this.previousLocation === "Overworld") {
                
                Player.userData.setPosition("south");
                
            } else {
                
                Player.userData.setPosition("south");
                
            }

        } else {
            
            this.location = "Overworld";
            this.X = 0;
            this.Y = 0;
            Camera.padX = 4;
            Camera.padY = 5;
            this.render();
            Player.userData.setPosition("exact", 22, 8);
            
        }
        
        Camera.transition.fadeIn(ctx, true);
        Camera.setPosition(Camera.padX, Camera.padY);
        Storage.save();

    },
    
    setDungeonLocation: function () {
        'use strict';
        this.remove();
        var currentMap = mapGrid[this.location][this.floor];

        if (Player.position.x > (currentMap[this.Y][this.X][0].length - 1) * blockW - 1 && currentMap[this.Y][this.X + 1] !== undefined) {
            this.X += 1;
            this.render();
            Player.userData.setPosition("west");
            
        } else if (Player.position.x < blockW + 1 && currentMap[this.Y][this.X - 1] !== undefined) {
            this.X -= 1;
            this.render();
            Player.userData.setPosition("east");
            
        } else if (Player.position.y > (currentMap[this.Y][this.X].length - 1) * blockD - 1 && currentMap[this.Y + 1][this.X] !== undefined) {
            this.Y += 1;
            this.render();
            Player.userData.setPosition("south");
            
        } else if (Player.position.y < blockD + 1 && currentMap[this.Y - 1][this.X] !== undefined) {
            this.Y -= 1;
            this.render();
            Player.userData.setPosition("north");
            
        }
        
        Camera.transition.fadeIn(ctx, false);
        
    },
    
    remove: function () {
        'use strict';
        var i, j;
        
        for (i = 0; i < mapGrid[this.location][this.floor][this.Y][this.X].length; i += 1) {

            for (j = 0; j < mapGrid[this.location][this.floor][this.Y][this.X][i].length; j += 1) {
                
                scene.remove(mapGrid[this.location][this.floor][this.Y][this.X][i][j]);
                
            }
        }
        
    },
    
    render: function () {
        'use strict';
        var i, j;
        
        for (i = 0; i < mapGrid[this.location][this.floor][this.Y][this.X].length; i += 1) {
            
            for (j = 0; j < mapGrid[this.location][this.floor][this.Y][this.X][i].length; j += 1) {
                    
                this.add(i, j);
                    
            }
                
        }
        
    },
    
    add: function (i, j) {
        'use strict';
        var currentMap = mapGrid[this.location][this.floor][this.Y][this.X],
            type = currentMap[i][j].bt,
            geometry = currentMap[i][j].geometry,
            material = currentMap[i][j].material,
            interact = currentMap[i][j].interact,
            hit = currentMap[i][j].hit,
            hitPad = currentMap[i][j].hitPad,
            contents = currentMap[i][j].contents,
            locked = currentMap[i][j].locked;

        if (type !== undefined) {
            currentMap[i][j] = new THREE.Mesh(geometry, material);
            currentMap[i][j].position.x = j * blockW;
            currentMap[i][j].position.y = (currentMap.length - 1 - i) * blockD;
            currentMap[i][j].userData.bt = type;
            currentMap[i][j].userData.hit = hit;
            currentMap[i][j].userData.hitPad = hitPad;

            if (type === 0 || type === 3 || type === 4 || type === 5) {
                currentMap[i][j].position.z = 0;
                currentMap[i][j].receiveShadow = true;
            } else if (type === 6) {
                currentMap[i][j].position.z = 0.5;
                currentMap[i][j].receiveShadow = true;
                currentMap[i][j].castShadow = true;
                currentMap[i][j].userData.interact = interact;
            } else if (type === 7) {
                currentMap[i][j].position.z = 0.5;
                currentMap[i][j].receiveShadow = true;
                currentMap[i][j].userData.contents = contents;
            } else if (type === 8) {
                currentMap[i][j].position.z = 1;
                currentMap[i][j].userData.locked = locked;
            } else {
                currentMap[i][j].position.z = 1;
                currentMap[i][j].castShadow = true;
            }
            
        }
        
        scene.add(currentMap[i][j]);
        
    },
    
    hitDetect: function (specific) {
        'use strict';
        var playerX = Player.position.x, playerY = Player.position.y,
            block, blockX, blockY, hitPad, type, i, j;
    
        for (i = 0; i < mapGrid[this.location][this.floor][this.Y][this.X].length; i += 1) {
            for (j = 0; j < mapGrid[this.location][this.floor][this.Y][this.X][i].length; j += 1) {

                block = mapGrid[this.location][this.floor][this.Y][this.X][i][j];
                blockX = block.position.x;
                blockY = block.position.y;
                type = block.userData.bt;
                hitPad = block.userData.hitPad;
                
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad) && type === 1) {
                    return block.userData.hit;
                }

                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad) && type === 3) {
                
                    this.previousLocation = this.location;
                
                    if (this.location === "Overworld") {
                        this.setOverworldLocation("Dungeon 1");
                    } else if (this.location === "Dungeon 1") {
                        this.setOverworldLocation("Overworld");
                    }
                    return block.userData.hit;

                }
            
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad) && type === 4) {
                
                    this.previousLocation = this.location;
                
                    if (this.location === "Overworld") {
                        this.setOverworldLocation("Dungeon 2");
                    } else if (this.location === "Dungeon 2") {
                        this.setOverworldLocation("Overworld");
                    }
                    return block.userData.hit;

                }
            
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad) && type === 5) {
                    this.setDungeonLocation();
                    return block.userData.hit;
                }
                
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad - 0.1) && type === 6) {
                    return block.userData.hit;
                }
                 
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad - 0.1) && type === 7) {
                    return block.userData.hit;
                }
                
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad - 0.2) && type === 8) {
                    
                    if (block.userData.locked) {
                        return block.userData.hit;
                    } else if (!block.userData.locked) {
                        this.setDungeonLocation();
                        return block.userData.hit;
                    }
                    
                }
                
                if (this.blockCheck(playerX, playerY, blockX, blockY, hitPad) && type === specific) {
                    return block;
                }
                
            }
        }
        
    },
    
    blockCheck: function (playerX, playerY, blockX, blockY, pad) {
        'use strict';
        
        if (playerX + pad > blockX - (blockW / 2) && playerX - pad < blockX + (blockW / 2) && playerY + pad > blockY - (blockD / 2) && playerY - pad < blockY + (blockD / 2)) {
            return true;
        }
        
    }
        
};
