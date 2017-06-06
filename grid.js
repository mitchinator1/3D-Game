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
                player.position.x = 18;
                player.position.y = 10;
            } else if (this.previousLocation === "Dungeon2") {
                player.position.x = 26;
                player.position.y = 10;
            } else {
                player.position.x = 12;
                player.position.y = 8;
            }

        } else if (this.location === "Dungeon1") {
            this.gridX = 1;
            this.gridY = 0;
            lighting.fog(35);
            
            if (this.previousLocation === "Overworld") {
                player.position.x = 10;
                player.position.y = 2;
            } else {
                player.position.x = 10;
                player.position.y = 2;
            }
            

        } else if (this.location === "Dungeon2") {
            this.gridX = 0;
            this.gridY = 0;
            lighting.fog(50);
            
            if (this.previousLocation === "Overworld") {
                player.position.x = 8;
                player.position.y = 2;
            } else {
                player.position.x = 8;
                player.position.y = 2;
            }

        } else {
            this.location = "Overworld";
            this.gridX = 0;
            this.gridY = 0;
            player.position.x = 22;
            player.position.y = 8;
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
            player.position.x = blockW;
            camera.control.set(player.position.x + 4, player.position.y - 8);
            
        } else if (player.position.x < blockW + 1 && mapGrid[this.location][this.floor][this.gridY][this.gridX - 1] !== undefined) {
            this.gridX -= 1;
            //player.position.x = this.currentGrid[0].length * blockW - 4;
            player.position.x = (mapGrid[this.location][this.floor][this.gridY][this.gridX][0].length - 1) * blockW - 2;
            //player.setDungeonPosition();
            console.log(mapGrid[this.location][this.floor][this.gridY][this.gridX][0].length);
            camera.control.set(player.position.x - 4, player.position.y - 8);
            
        } else if (player.position.y > this.currentGrid.length * 2 - 3 && mapGrid[this.location][this.floor][this.gridY + 1][this.gridX] !== undefined) {
            this.gridY += 1;
            player.position.y = blockD;
            camera.control.set(player.position.x, player.position.y - 2);
            
        } else if (player.position.y < blockD + 1 && mapGrid[this.location][this.floor][this.gridY - 1][this.gridX] !== undefined) {
            this.gridY -= 1;
            player.position.y = this.currentGrid.length * blockD - 2;
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
        
    }
    
};