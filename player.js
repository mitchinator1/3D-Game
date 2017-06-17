var THREE, scene, playerGeo, playerMat, Grid, mapGrid, blockD, blockW, Camera;

var Player = {
    
    init: function () {
        'use strict';

        Player = new THREE.Mesh(playerGeo, playerMat);
        Player.position.z = 1;
        Player.castShadow = true;
        Player.receiveShadow = true;
        
        scene.add(Player);
        
        Player.userData.controllable = true;
        Player.userData.setPosition = this.setPosition;
        Player.userData.pause = this.pause;
                
    },
    
    setPosition: function (relative, x, y) {
        'use strict';
        var i, j, grid = mapGrid[Grid.location][Grid.floor][Grid.Y][Grid.X];

        if (relative === "exact") {
            Player.position.x = x;
            Player.position.y = y;
        }
        
        if (relative === "overworld") {
            i = 0;
            j = 0;
            
            for (i; i < grid.length; i += 1) {
                for (j = 0; j < grid[i].length; j += 1) {
                    
                    if (grid[i][j].userData.set === "Door") {

                        if (grid[i][j].userData.enterLink === Grid.previousLocation) {
                        
                            Player.position.x = grid[i][j].position.x;
                            Player.position.y = grid[i][j].position.y - blockD;
                            
                        }
                        
                    }
                    
                }
            }
            
        }
        
        if (relative === "north") {
            i = 0;
            
            for (i; i < grid[0].length; i += 1) {

                if (grid[0][i].userData.bt === 5 || grid[0][i].userData.bt === 4 || grid[0][i].userData.bt === 3 || grid[0][i].userData.bt === 8) {

                    Player.position.x = grid[0][i].position.x;
                    Player.position.y = grid[0][i].position.y - blockD / 1.5;

                }
            }
            
        }
        
        if (relative === "south") {
            i = 0;
            
            for (i; i < grid[grid.length - 1].length; i += 1) {

                if (grid[grid.length - 1][i].userData.set === "Door") {

                    Player.position.x = grid[grid.length - 1][i].position.x;
                    Player.position.y = grid[grid.length - 1][i].position.y + blockD / 1.5;

                }
            }
            
        }
        
        if (relative === "east") {
            i = 0;
            
            for (i; i < grid.length; i += 1) {
                
                if (grid[i][grid[i].length - 1].userData.bt === 5 || grid[i][grid[i].length - 1].userData.bt === 4 || grid[i][grid[i].length - 1].userData.bt === 3 || grid[i][grid[i].length - 1].userData.bt === 8) {
                    
                    Player.position.x = grid[i][grid[i].length - 1].position.x - blockW / 1.5;
                    Player.position.y = grid[i][grid[i].length - 1].position.y;
                    
                }
            }

        }
    
        if (relative === "west") {
            i = 0;

            for (i; i < grid.length; i += 1) {
                
                if (grid[i][0].userData.bt === 5 || grid[i][0].userData.bt === 4 || grid[i][0].userData.bt === 3  || grid[i][0].userData.bt === 8) {
                    
                    Player.position.x = grid[i][0].position.x + blockW / 1.5;
                    Player.position.y = grid[i][0].position.y;
                    
                }
            }
            
        }
        
        Camera.setPosition(Camera.padX, Camera.padY);
        
    },
    
    pause: function (timer) {
        'use strict';
        
        var pause = setInterval(function () {
            Player.userData.controllable = false;
            if (timer > 0) {
                timer -= 0.01;
            } else if (timer <= 0) {
                clearInterval(pause);
                Player.userData.controllable = true;
            }
        }, 5);
    }
    
};
