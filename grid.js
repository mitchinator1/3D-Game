var entryX, entryY, player,
    blockW, blockD,
    blockGeos, blockMats,
    THREE, scene, camera, lighting, ctx, canvas, hud, storage, mapGrid;

var Grid = {
    
    init: function () {
        'use strict';
        
        this.gridArray = [];
        this.update = true;
        this.gridX = 0;
        this.gridY = 0;
        this.setOverworldLocation(this.location);

    },
    
    setOverworldLocation: function (mapLocation) {
        'use strict';
        this.location = mapLocation;
        
        if (this.location === "Overworld") {
            this.gridX = 0;
            this.gridY = 0;
            lighting.fog(0);
            
            if (this.previousLocation === "Dungeon1") {
                this.setPlayerPosition("exact", 18, 10);
            } else if (this.previousLocation === "Dungeon2") {
                this.setPlayerPosition("exact", 26, 10);
            } else {
                this.setPlayerPosition("exact", 12, 8);
            }

        } else if (this.location === "Dungeon1") {
            this.gridX = 1;
            this.gridY = 0;
            lighting.fog(35);
            
            if (this.previousLocation === "Overworld") {
                this.setPlayerPosition("exact", 10, 2);
            } else {
                this.setPlayerPosition("exact", 10, 2);
            }
            

        } else if (this.location === "Dungeon2") {
            this.gridX = 0;
            this.gridY = 0;
            lighting.fog(50);
            
            if (this.previousLocation === "Overworld") {
                this.setPlayerPosition("exact", 8, 2);
            } else {
                this.setPlayerPosition("exact", 8, 2);
            }

        } else {
            
            this.location = "Overworld";
            this.gridX = 0;
            this.gridY = 0;
            this.setPlayerPosition("exact", 22, 8);
            
        }
        
        camera.transition.fadeIn(ctx);
        this.currentGrid = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        camera.control.set(player.position.x, 0);
        storage.save();
        this.render();
        this.update = true;
            
    },
    
    setDungeonLocation: function () {
        'use strict';

        if (player.position.x > this.currentGrid[0].length * 2 - 3 && mapGrid[this.location][this.floor][this.gridY][this.gridX + 1] !== undefined) {
            this.gridX += 1;
            this.setPlayerPosition("left");
            camera.control.set(player.position.x + 4, player.position.y - 8);
            
        } else if (player.position.x < blockW + 1 && mapGrid[this.location][this.floor][this.gridY][this.gridX - 1] !== undefined) {
            this.gridX -= 1;
            this.setPlayerPosition("right");
            camera.control.set(player.position.x - 4, player.position.y - 8);
            
        } else if (player.position.y > this.currentGrid.length * 2 - 3 && mapGrid[this.location][this.floor][this.gridY + 1][this.gridX] !== undefined) {
            this.gridY += 1;
            this.setPlayerPosition("south");
            camera.control.set(player.position.x, player.position.y - 2);
            
        } else if (player.position.y < blockD + 1 && mapGrid[this.location][this.floor][this.gridY - 1][this.gridX] !== undefined) {
            this.gridY -= 1;
            this.setPlayerPosition("north");
            camera.control.set(player.position.x, player.position.y - 14);
            
        }
        
        this.currentGrid = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        camera.transition.fadeIn(ctx);
        this.render();
        this.update = true;
        
    },
    
    render: function () {
        'use strict';
        var i, j, type, index = 0;
    
        if (this.update) {
            for (type in this.gridArray) {
                scene.remove(this.gridArray[type]);
            }
            this.update = false;
            this.gridArray = [];
            
            camera.maxX = 0;
            camera.maxY = (this.currentGrid.length - 1) * blockD;
            
            for (i = 0; i < this.currentGrid.length; i += 1) {
                
                if ((this.currentGrid[i].length - 1) * blockW > camera.maxX) {
                    camera.maxX = (this.currentGrid[i].length - 1) * blockW;
                }
                
                for (j = 0; j < this.currentGrid[i].length; j += 1) {
                    type = this.currentGrid[i][j];
                    this.add(index, ((this.currentGrid.length - 1) - i) * blockD, j * blockW, type);
                    index += 1;
                }
                
            }
            
        }
    },
    
    add: function (index, i, j, type) {
        'use strict';
        
        this.gridArray[index] = new THREE.Mesh(blockGeos[type], blockMats[type]);
        this.gridArray[index].position.x = j;
        this.gridArray[index].position.y = i;
        this.gridArray[index].type = type;

        if (type === 0 || type === 3 || type === 4) {
            this.gridArray[index].position.z = 0;
            this.gridArray[index].receiveShadow = true;
        } else {
            this.gridArray[index].position.z = 1;
            this.gridArray[index].castShadow = true;
        }
        
        scene.add(this.gridArray[index]);
        
    },
    
    hitDetect: function () {
        'use strict';
        var playerX = player.position.x, playerY = player.position.y,
            blockX, blockY, type, i;
    
        for (i = 0; i < this.gridArray.length; i += 1) {
            blockX = this.gridArray[i].position.x;
            blockY = this.gridArray[i].position.y;
            type = this.gridArray[i].type;

            if (this.blockCheck(playerX, playerY, blockX, blockY, 0.9) && type === 1) {
                return true;
            }

            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 3) {
                
                this.previousLocation = this.location;
                
                if (this.location === "Overworld") {
                    this.setOverworldLocation("Dungeon1");
                } else if (this.location === "Dungeon1") {
                    this.setOverworldLocation("Overworld");
                }

            }
            
            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 4) {
                
                this.previousLocation = this.location;
                
                if (this.location === "Overworld") {
                    this.setOverworldLocation("Dungeon2");
                } else if (this.location === "Dungeon2") {
                    this.setOverworldLocation("Overworld");
                }

            }
            
            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 5) {
                this.setDungeonLocation();
            }
            
        }
    },
    
    blockCheck: function (playerX, playerY, blockX, blockY, pad) {
        'use strict';
        
        if (playerX + pad > blockX - (blockW / 2) && playerX - pad < blockX + (blockW / 2) && playerY + pad > blockY - (blockD / 2) && playerY - pad < blockY + (blockD / 2)) {
            return true;
        }
        
    },
    
    setPlayerPosition: function (relative, x, y) {
        'use strict';
        var highX = 0;
        var startX = 0;
        var i;
        var j;
        var k;
        var l;
        
        if (relative === "exact") {
            player.position.x = x;
            player.position.y = y;
        }
        
        if (relative === "north") {
            player.position.y = (mapGrid[this.location][this.floor][this.gridY][this.gridX].length - 1) * blockD - 2;
            
            for (j = 0; j < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; j += 1) {
                if (mapGrid[this.location][this.floor][this.gridY][this.gridX][0][j] === 5) {
                    player.position.x = j * blockW;
                }
            }
            
        }
        
        if (relative === "right") {
            for (i = 0; i < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; i += 1) {
                if (highX < mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length - 1) {
                    highX = mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length - 1;
                }
            }
        
            player.position.x = highX * blockW - 2;
        
        }
    
        if (relative === "left") {
            player.position.x = blockW;
            
            for (k = 0; k < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; k += 1) {
                if (mapGrid[this.location][this.floor][this.gridY][this.gridX][k][0] === 5) {
                    player.position.y = (mapGrid[this.location][this.floor][this.gridY][this.gridX].length - k) * blockD;
                }
                
            }
            
        }
        
        if (relative === "south") {
            player.position.y = blockD;
        }
        
    }
        
};
