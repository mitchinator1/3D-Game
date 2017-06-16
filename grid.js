var blockW, blockD, blockH, blockGeos, blockMats,
    THREE, scene, Player, Camera, Lighting, ctx, canvas, HUD, Storage, mapGrid, mapGridTest;

console.log("2:44");

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
                        //HUD.locationText("Dungeon 1");
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
        
    },
    
    readGrid: function () {
        var i, j, k;
        
        for (i = 0; i < mapGridTest.length; i += 1) {
            for (j = 0; j < mapGridTest[i].length; j += 1) {
                
                var src = mapGridTest[i][j].toString(2);
                for (k = src.length; k < 16; k += 1) {
                    
                    src = "0" + src;
                    
                }

                k = 0;
                
                var setSrc = parseInt(src.slice(0, 2), 2),
                    typeSrc = parseInt(src.slice(2, 7), 2),
                    dataSrc = parseInt(src.slice(7), 2);
                
                console.log(dataSrc);
                
                var parsed = this.parseSet(setSrc, typeSrc, dataSrc);
                
                var hit = parsed.hit,
                    hitPad = parsed.hitPad,
                    set = parsed.set,
                    data = parsed.data,
                    testSpot = parsed.testSpot;
                
                mapGridTest[i][j] = new THREE.Mesh(parsed.geometry, parsed.material);
                
                mapGridTest[i][j].userData.hit = hit;
                mapGridTest[i][j].userData.hitPad = hitPad;
                mapGridTest[i][j].userData.set = set;
                mapGridTest[i][j].userData.data = data;
                mapGridTest[i][j].userData.testSpot = testSpot;
                
                mapGridTest[i][j].position.x = j * blockW;
                mapGridTest[i][j].position.y = (mapGridTest.length - 1 - i) * blockD;

                mapGridTest[i][j].position.z = 1;
                
                mapGridTest[i][j].castShadow = true;
                
                scene.add(mapGridTest[i][j]);
                
            }
        }
        
    },
    
    parseSet: function (setSrc, typeSrc, dataSrc) {
        var block;
        
        switch (setSrc) {
            case 0: block = { set: "Passable", hit: false };
                break;
            case 1: block = { set: "Wall", hit: true };
                break;
            case 2: block = { set: "Interactable", hit: true };
                break;
            case 3: block = { set: "Door", hit: true };
                break;
                      }
        
        return this.parseType(block, typeSrc, dataSrc);
        
    },
    
    parseType: function (block, typeSrc, dataSrc) {
        
        if (block.set === "Passable") {
            switch (typeSrc) {
                case 0: block.geometry = new THREE.BoxGeometry(blockW, blockD, 0.01);
                    block.material = new THREE.MeshLambertMaterial({ color: 0x33aa00 });
                    block.hitPad = 0;
                    break;
                case 1: block.geometry = new THREE.BoxGeometry(blockW, blockD, 0.5);
                    block.material = new THREE.MeshLambertMaterial({ color: 0x119922 });
                    block.hitPad = 0;
                    break;
                default: block.geometry = new THREE.boxGeometry(blockW / 2, blockD, blockH * 5);
                    block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                    block.hitPad = 1;
                    break;
                           }
        }
        
        if (block.set === "Wall") {
            switch (typeSrc) {
                case 0: block.geometry = new THREE.BoxGeometry(blockW, blockD, blockH * 2);
                    block.material = new THREE.MeshLambertMaterial({ color: 0xddaa55 });
                    block.hitPad = 0.9;
                    break;
                case 1: block.geometry = new THREE.BoxGeometry(2, 2, 2);
                    block.material = new THREE.MeshLambertMaterial({ color: 0x000000 });
                    block.hitPad = 1;
                    break;
                default: block.geometry = new THREE.BoxGeometry(blockW / 2, blockD / 2, blockH * 5);
                    block.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
                    block.hitPad = 1;
                    break;
                           }
        }

        return this.parseData(block, dataSrc);
        
    },
    
    parseData: function (block, dataSrc) {
        
        block.data = dataSrc;
        
        console.log(block);
        
        return block;
        
    }
        
};
