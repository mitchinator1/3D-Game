var entryX, entryY, player,
    blockW, blockD,
    blockGeos, blockMats,
    THREE, scene, camera, lighting, ctx, canvas, hud, storage, mapGrid;

var Grid = {
    
    init: function () {
        'use strict';
        
        this.gridX = 0;
        this.gridY = 0;
        this.setOverworldLocation(this.location);

    },
    
    setOverworldLocation: function (mapLocation) {
        'use strict';
        this.remove();
        this.location = mapLocation;
        
        if (this.location === "Overworld") {
            this.gridX = 0;
            this.gridY = 0;
            camera.padX = 4;
            camera.padY = 4;
            lighting.fog(0x000000, 5);
            this.render();
            
            if (this.previousLocation === "Dungeon1") {

                this.setPlayerPosition("overworld", 3);
                
            } else if (this.previousLocation === "Dungeon2") {

                this.setPlayerPosition("overworld", 4);
                
            } else {
                this.setPlayerPosition("exact", 14, 8);
            }

        } else if (this.location === "Dungeon1") {
            this.gridX = 1;
            this.gridY = 0;
            camera.padX = 3;
            camera.padY = 4;
            lighting.fog(0x000000, 30);
            this.render();
            
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
            lighting.fog(0x000000, 45);
            this.render();

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
            this.render();
            this.setPlayerPosition("exact", 22, 8);
            
        }
        
        camera.transition.fadeIn(ctx);
        camera.setPosition(camera.padX, camera.padY);
        storage.save();

    },
    
    setDungeonLocation: function () {
        'use strict';
        this.remove();
        var currentMap = mapGrid[this.location][this.floor];

        if (player.position.x > (currentMap[this.gridY][this.gridX][0].length - 1) * blockW - 1 && currentMap[this.gridY][this.gridX + 1] !== undefined) {
            this.gridX += 1;
            this.render();
            this.setPlayerPosition("west");
            
        } else if (player.position.x < blockW + 1 && currentMap[this.gridY][this.gridX - 1] !== undefined) {
            this.gridX -= 1;
            this.render();
            this.setPlayerPosition("east");
            
        } else if (player.position.y > (currentMap[this.gridY][this.gridX].length - 1) * blockD - 1 && currentMap[this.gridY + 1][this.gridX] !== undefined) {
            this.gridY += 1;
            this.render();
            this.setPlayerPosition("south");
            
        } else if (player.position.y < blockD + 1 && currentMap[this.gridY - 1][this.gridX] !== undefined) {
            this.gridY -= 1;
            this.render();
            this.setPlayerPosition("north");
            
        }
        
        camera.transition.fadeIn(ctx);
        
    },
    
    remove: function () {
        'use strict';
        var i, j;
        
        for (i = 0; i < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; i += 1) {

            for (j = 0; j < mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length; j += 1) {
                
                scene.remove(mapGrid[this.location][this.floor][this.gridY][this.gridX][i][j]);
                
            }
        }
        
    },
    
    render: function () {
        'use strict';
        var i, j;
        
        for (i = 0; i < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; i += 1) {
            
            for (j = 0; j < mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length; j += 1) {
                    
                this.add(i, j);
                    
            }
                
        }
        
    },
    
    add: function (i, j) {
        'use strict';
        var curMap = mapGrid[this.location][this.floor][this.gridY][this.gridX],
            type = curMap[i][j].bt;

        if (type !== undefined) {
            curMap[i][j] = new THREE.Mesh(blockGeos[type], blockMats[type]);
            curMap[i][j].position.x = j * blockW;
            curMap[i][j].position.y = (curMap.length - 1 - i) * blockD;
            curMap[i][j].userData.bt = type;


            if (type === 0 || type === 3 || type === 4 || type === 5) {
                curMap[i][j].position.z = 0;
                curMap[i][j].receiveShadow = true;
            } else {
                curMap[i][j].position.z = 1;
                curMap[i][j].castShadow = true;
            }
            
        }
        
        scene.add(curMap[i][j]);
        
    },
    
    hitDetect: function () {
        'use strict';
        var playerX = player.position.x, playerY = player.position.y,
            blockX, blockY, type, i, j;
    
        for (i = 0; i < mapGrid[this.location][this.floor][this.gridY][this.gridX].length; i += 1) {
            for (j = 0; j < mapGrid[this.location][this.floor][this.gridY][this.gridX][i].length; j += 1) {

                blockX = mapGrid[this.location][this.floor][this.gridY][this.gridX][i][j].position.x;
                blockY = mapGrid[this.location][this.floor][this.gridY][this.gridX][i][j].position.y;
                type = mapGrid[this.location][this.floor][this.gridY][this.gridX][i][j].userData.bt;

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
                    return true;

                }
            
                if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 4) {
                
                    this.previousLocation = this.location;
                
                    if (this.location === "Overworld") {
                        this.setOverworldLocation("Dungeon2");
                    } else if (this.location === "Dungeon2") {
                        this.setOverworldLocation("Overworld");
                    }
                    return true;

                }
            
                if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 5) {
                    this.setDungeonLocation();
                    return true;
                }
                
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
        var i, j, grid = mapGrid[this.location][this.floor][this.gridY][this.gridX];

        if (relative === "exact") {
            player.position.x = x;
            player.position.y = y;
        }
        
        if (relative === "overworld") {
            i = 0;
            j = 0;
            
            for (i; i < grid.length; i += 1) {
                for (j = 0; j < grid[i].length; j += 1) {
                    
                    if (grid[i][j].userData.bt === x) {

                        player.position.x = grid[i][j].position.x;
                        player.position.y = grid[i][j].position.y  - blockD;
                        
                    }
                    
                }
            }
            
        }
        
        if (relative === "north") {
            i = 0;
            
            for (i; i < grid[0].length; i += 1) {

                if (grid[0][i].userData.bt === 5 || grid[0][i].userData.bt === 4 || grid[0][i].userData.bt === 3) {

                    player.position.x = grid[0][i].position.x;
                    player.position.y = grid[0][i].position.y - blockD;

                }
            }
            
        }
        
        if (relative === "south") {
            i = 0;
            
            for (i; i < grid[grid.length - 1].length; i += 1) {

                if (grid[grid.length - 1][i].userData.bt === 5 || grid[grid.length - 1][i].userData.bt === 4 || grid[grid.length - 1][i].userData.bt === 3) {

                    player.position.x = grid[grid.length - 1][i].position.x;
                    player.position.y = grid[grid.length - 1][i].position.y + blockD;

                }
            }
            
        }
        
        if (relative === "east") {
            i = 0;
            
            for (i; i < grid.length; i += 1) {
                
                if (grid[i][grid[i].length - 1].userData.bt === 5 || grid[i][grid[i].length - 1].userData.bt === 4 || grid[i][grid[i].length - 1].userData.bt === 3) {
                    
                    player.position.x = grid[i][grid[i].length - 1].position.x - blockW;
                    player.position.y = grid[i][grid[i].length - 1].position.y;
                    
                }
            }

        }
    
        if (relative === "west") {
            i = 0;
            
            for (i; i < grid.length; i += 1) {
                
                if (grid[i][0].userData.bt === 5 || grid[i][0].userData.bt === 4 || grid[i][0].userData.bt === 3) {
                    
                    player.position.x = grid[i][0].position.x + blockW;
                    player.position.y = grid[i][0].position.y;
                    
                }
            }
            
        }
        
        camera.setPosition(camera.padX, camera.padY);
        
    }
        
};
