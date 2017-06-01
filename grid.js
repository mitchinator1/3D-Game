var overworldGrid, dungeonGrid, dungeon2Grid,
    entryX, entryY, player,
    blockW, blockD,
    blockGeos, blockMats,
    THREE, scene, camera, ctx, canvas, hud, storage;

var Grid = {
    
    init: function () {
        
        this.gridArray = [];
        this.update = true;
        this.setLocation(this.location);

    },
    
    setLocation: function (mapLocation) {
        this.location = mapLocation;
        
        if (this.location === "Overworld") {
            this.currentGrid = overworldGrid;
            
            if (this.previousLocation === "Dungeon") {
                player.position.x = 18;
                player.position.y = 10;
            } else if (this.previousLocation === "Dungeon2") {
                player.position.x = 26;
                player.position.y = 10;
            } else {
                player.position.x = 12;
                player.position.y = 8;
            }

        } else if (this.location === "Dungeon") {
            this.currentGrid = dungeonGrid;
            
            if (this.previousLocation === "Overworld") {
                player.position.x = 8;
                player.position.y = 2;
            } else {
                player.position.x = 12;
                player.position.y = 8;
            }
            

        } else if (this.location === "Dungeon2") {
            this.currentGrid = dungeon2Grid;
            
            if (this.previousLocation === "Overworld") {
                player.position.x = 8;
                player.position.y = 2;
            } else {
                player.position.x = 12;
                player.position.y = 8;
            }

        } else {
            this.location = "Overworld";
            this.currentGrid = overworldGrid;
        }
        
        camera.transition.fadeIn(ctx);
        camera.control.set(player.position.x, 0);
        storage.save();
        this.render();
        this.update = true;
            
    },
    
    render: function () {
        var i, j, type, index = 0;
    
        if (this.update) {
            for (type in this.gridArray) {
                scene.remove(this.gridArray[type]);
            }
            this.update = false;
            this.gridArray = [];

            for (i = 0; i < this.currentGrid.length; i += 1) {
                for (j = 0; j < this.currentGrid[i].length; j += 1) {
                    type = this.currentGrid[i][j];
                    this.add(index, i * blockD, j * blockW, type);
                    index += 1;
                }
            }
        }
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
                
                this.previousLocation = this.location;
                
                if (this.location === "Overworld") {
                    //this.location = "Dungeon";
                    this.setLocation("Dungeon");
                } else if (this.location === "Dungeon") {
                    //this.location = "Overworld";
                    this.setLocation("Overworld");
                }
                this.update = true;
            }
            
            if (this.blockCheck(playerX, playerY, blockX, blockY, 0) && type === 4) {
                
                this.previousLocation = this.location;
                
                if (this.location === "Overworld") {
                   // this.location = "Dungeon2";
                    this.setLocation("Dungeon2");
                } else if (this.location === "Dungeon2") {
                    //this.location = "Overworld";
                    this.setLocation("Overworld");
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
