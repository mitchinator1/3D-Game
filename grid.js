var entryX, entryY, player,
    blockW, blockD,
    blockGeos, blockMats,
    THREE, scene, camera, lighting, ctx, canvas, hud, storage, mapGrid;

var Grid = {
    
    init: function () {
        'use strict';
        
        //this.gridArray = [];
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
            camera.padX = 4;
            camera.padY = 4;
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
            camera.padX = 3;
            camera.padY = 4;
            lighting.fog(35);
            
            if (this.previousLocation === "Overworld") {
                this.setPlayerPosition("south");
            } else {
                this.setPlayerPosition("south");
            }
            

        } else if (this.location === "Dungeon2") {
            this.gridX = 0;
            this.gridY = 0;
            camera.padX = 3;
            camera.padY = 4;
            lighting.fog(50);

            if (this.previousLocation === "Overworld") {
                this.setPlayerPosition("south");
            } else {
                this.setPlayerPosition("south");
            }

        } else {
            
            this.location = "Overworld";
            this.gridX = 0;
            this.gridY = 0;
            camera.padX = 4;
            camera.padY = 5;
            this.setPlayerPosition("exact", 22, 8);
            
        }
        
        camera.transition.fadeIn(ctx);
        //this.currentGrid = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        camera.setPosition(camera.padX, camera.padY);
        storage.save();
        this.render();
        this.update = true;
            
    },
    
    setDungeonLocation: function () {
        'use strict';
        var currentMap = mapGrid[this.location][this.floor];

        if (player.position.x > this.currentGrid[0].length * 2 - 3 && currentMap[this.gridY][this.gridX + 1] !== undefined) {
            this.gridX += 1;
            this.setPlayerPosition("west");
            
        } else if (player.position.x < blockW + 1 && currentMap[this.gridY][this.gridX - 1] !== undefined) {
            this.gridX -= 1;
            this.setPlayerPosition("east");
            
        } else if (player.position.y > this.currentGrid.length * 2 - 3 && currentMap[this.gridY + 1][this.gridX] !== undefined) {
            this.gridY += 1;
            this.setPlayerPosition("south");
            
        } else if (player.position.y < blockD + 1 && currentMap[this.gridY - 1][this.gridX] !== undefined) {
            this.gridY -= 1;
            this.setPlayerPosition("north");
            
        }
        
        //this.currentGrid = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        camera.transition.fadeIn(ctx);
        camera.setPosition(camera.padX, camera.padY);
        this.render();
        this.update = true;
        
    },
    
    render: function () {
        'use strict';
        var i, j, k, l, index = 0;
    
        if (this.update) {
            /*for (k = 0; k < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; k += 1) {
                for (l = 0;
                scene.remove(mapGrid[this.location][this.floor][this.gridY][this.gridX].type);
            }*/
            this.update = false;
            //this.gridArray = [];
            
            for (i = 0; i < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; i += 1) {
                
                for (j = 0; j < mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length; j += 1) {
                    //type = this.currentGrid[i][j];
                    this.add(i, j);]
                    //index += 1;
                }
            }
            
        }
        
    },
    
    add: function (i, j) {
        'use strict';
        var curMap = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        var type = curMap[i][j].type;
        
        curMap[i][j] = new THREE.Mesh(blockGeos[type], blockMats[type]);
        curMap[i][j].position.x = j * blockW;
        curMap[i][j].position.y = (curMap.length - 1 - i) * blockD;
        //curMap[i][j].type = type;

        if (type === 0 || type === 3 || type === 4) {
            curMap[i][j].position.z = 0;
            curMap[i][j].receiveShadow = true;
        } else {
            curMap[i][j].position.z = 1;
            curMap[i][j].castShadow = true;
        }
        
        scene.add(curMap[i][j]);
        
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
        var maxX = 0, i = 0, j = 0, k = 0, l = 0,
            grid = mapGrid[this.location][this.floor][this.gridY][this.gridX];
        
        if (relative === "exact") {
            player.position.x = x;
            player.position.y = y;
        }
        
        if (relative === "north") {
            player.position.y = (grid.length - 1) * blockD - 2;
            
            for (j; j < grid.length; j += 1) {
                if (grid[0][j] === 5) {
                    player.position.x = j * blockW;
                }
            }
            
        }
        
        if (relative === "east") {
            for (i; i < grid.length; i += 1) {
                if (grid[i][0] === 5) {
                    player.position.y = (grid.length - 1 - i) * blockD;
                }
                if (maxX < grid[i].length - 1) {
                    maxX = grid[i].length - 1;
                }
            }
        
            player.position.x = maxX * blockW - 2;
            
        }
    
        if (relative === "west") {

            for (k; k < grid.length; k += 1) {
                if (grid[k][0] === 5) {
                    player.position.y = (grid.length - 1 - k) * blockD;
                    player.position.x = blockW;
                    console.log(grid[k].indexOf(0));
                }
                
            }
            
        }
        
        if (relative === "south") {
            player.position.y = blockD;
            
            for (l; l < grid[grid.length - 1].length; l += 1) {
                if (grid[grid.length - 1][l] === 5 || grid[grid.length - 1][l] === 4 || grid[grid.length - 1][l] === 3) {
                    player.position.x = l * blockW;
                }
            }
            
        }
        
    }
        
};
