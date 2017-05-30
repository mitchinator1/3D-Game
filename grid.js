var overworldGrid, dungeonGrid, dungeon2Grid,
    entryX, entryY, player,
    blockW, blockD,
    blockGeos, blockMats,
    THREE, scene, camera, ctx, canvas, hud, storage;

var Grid = {
    
    init: function (mapLocation) {
        
        this.gridArray = [];
        this.setLocation(this.location, true);

    },
    
    findStart: function (link) {
        for (type in this.gridArray) {
            if (this.gridArray[type].type === link) {
                player.position.x = this.gridArray[type].position.x;
                player.position.y = this.gridArray[type].position.y;
                console.log(this.gridArray[type].position.x);
            }
        }
    },
    
    setLocation: function (mapLocation, update) {
        this.location = mapLocation;
        if (mapLocation === "Overworld") {
            this.currentGrid = overworldGrid;
            this.findStart(3);
            //player.position.x = 18;
            //player.position.y = 10;
            camera.control.set(player.position.x, 0);
        } else if (mapLocation === "Dungeon" && update) {
            this.currentGrid = dungeonGrid;
            //this.findStart(3);
            //player.position.x = 8;
            //player.position.y = 2;
            camera.control.set(player.position.x, 0);
        } else if (mapLocation === "Dungeon2" && update) {
            this.currentGrid = dungeon2Grid;
            player.position.x = 8;
            player.position.y = 2;
            camera.control.set(player.position.x, 0);
        }
        if (update) {
            camera.transition.fadeIn(ctx);
            storage.save();
        }
    },
    
    render: function (location) {
        var i, j, type, index = 0;
    
        if (this.update) {
            for (type in this.gridArray) {
                scene.remove(this.gridArray[type]);
            }

            this.gridArray = [];

            for (i = 0; i < this.currentGrid.length; i += 1) {
                for (j = 0; j < this.currentGrid[i].length; j += 1) {
                    type = this.currentGrid[i][j];
                    this.add(index, i * blockD, j * blockW, type);
                    index += 1;
                }
            }
        }
        //this.findStart(3);
        this.update = false;
        
    },
    
    add: function (index, i, j, type) {
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
        var playerX = player.position.x, playerY = player.position.y,
            blockX, blockY, type, i;
    
        for (i = 0; i < this.gridArray.length; i += 1) {
            blockX = this.gridArray[i].position.x;
            blockY = this.gridArray[i].position.y;
            type = this.gridArray[i].type;

            if (this.blockCheck(playerX, playerY, blockX, blockY, 0.9) && type === 1) {
                return true;
            }
            if (this.blockCheck(playerX, playerY, blockX, blockY, 0.9) && type === 5) {
                hud.health(true, -1);
                return true;
            }

            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 3) {
                
                if (this.location === "Overworld") {
                    this.setLocation("Dungeon", true);
                } else if (this.location === "Dungeon") {
                    this.setLocation("Overworld", true);
                }
                this.update = true;
            }
            
            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 4) {
                
                if (this.location === "Overworld") {
                    this.setLocation("Dungeon2", true);
                } else if (this.location === "Dungeon2") {
                    this.setLocation("Overworld", true);
                }
                this.update = true;
            }
            
        }
    },
    
    blockCheck: function (playerX, playerY, blockX, blockY, pad) {
        if (playerX + pad > blockX - (blockW / 2) && playerX - pad < blockX + (blockW / 2) && playerY + pad > blockY - (blockD / 2) && playerY - pad < blockY + (blockD / 2)) {
            return true;
        }
    }
    
};