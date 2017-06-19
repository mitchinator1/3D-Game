var mainCam, THREE, ctx, canvas, Grid;

var HUD = {
    
    init: function () {
        'use strict';
        
        this.showInventory = false;
        this.showHud = true;
        
        //Item Counts
        this.health(true, 0);
        this.coinCount = 97;
        this.coinMax = 99;
        this.inventoryGrid = [];
        this.refreshScreen = true;
        this.keyCount = 0;
        
        this.refreshMinX = 0;
        this.refreshMaxX = canvas.width;
        this.refreshMinY = 0;
        this.refreshMaxY = canvas.width;
        
        
        //Images
        this.topLeft = new Image();
        this.topLeft.src = 'sprites/topLeft.png';
        this.top = new Image();
        this.top.src = 'sprites/top.png';
        this.topRight = new Image();
        this.topRight.src = 'sprites/topRight.png';
        this.left = new Image();
        this.left.src = 'sprites/left.png';
        this.right = new Image();
        this.right.src = 'sprites/right.png';
        this.bottomLeft = new Image();
        this.bottomLeft.src = 'sprites/bottomLeft.png';
        this.bottom = new Image();
        this.bottom.src = 'sprites/bottom.png';
        this.bottomRight = new Image();
        this.bottomRight.src = 'sprites/bottomRight.png';
        
        this.coin = new Image();
        this.coin.src = 'sprites/coin.png';
        
        this.heart = new Image();
        this.heart.src = 'sprites/fullHeart.png';
        
        this.key = new Image();
        this.key.src = 'sprites/key.png';
    },
    
    refresh: function () {
        'use strict';
        
        if (this.refreshScreen) {
            ctx.clearRect(this.refreshMinX, this.refreshMinY, this.refreshMaxX, this.refreshMaxY);
        }
        
        this.displayInventory();
        
    },
    
    setRefreshArea: function (area) {
        'use strict';
        
        if (area === "Window") {
            this.refreshMaxY = canvas.height - 228;
        }
        if (area === "Full") {
            this.refreshMaxY = canvas.height;
        }
        
    },
    
    health: function (update, count) {
        'use strict';

        if (update) {
            if (this.heartCount < 20 && count > 0) {
                this.heartCount += count;
            } else if (this.heartCount > 4 && count < 0) {
                this.heartCount += count;
            }
            
        }
        
    },
    
    currency: function (count) {
        'use strict';
        if (this.coinCount < this.coinMax) {
            
            if (this.coinCount + count < this.coinMax) {
                this.coinCount += count;
                
            } else if (this.coinCount + count > this.coinMax) {
                var remainder = count - (this.coinCount + count) + this.coinMax;
                this.coinCount += remainder;
                
            }
        
        }
        
    },

    window: function (xPad, yPad, xScale, yScale, xMax, yMax, background) {
        'use strict';
        var i;
        
        if (background) {
            ctx.fillStyle = 'rgba(20,170,225,0.75)';
            ctx.fillRect(xPad + 6, yPad + 6, xMax - xPad + 6, yMax - yPad + 6);
        }
        
        ctx.drawImage(this.topLeft, xPad, yPad, xScale, yScale);
        ctx.drawImage(this.topRight, xMax, yPad, xScale, yScale);
        ctx.drawImage(this.bottomLeft, xPad, yMax, xScale, yScale);
        ctx.drawImage(this.bottomRight, xMax, yMax, xScale, yScale);
        
        for (i = 0; i < Math.round((xMax - xPad) / xScale) - 1; i += 1) {
            ctx.drawImage(this.top, xPad + xScale + (i * xScale), yPad, xScale, yScale);
            ctx.drawImage(this.bottom, xPad + xScale + (i * xScale), yMax, xScale, yScale);
        }
        
        for (i = 0; i < Math.floor((yMax - yPad) / yScale) - 1; i += 1) {
            ctx.drawImage(this.left, xPad, yPad + yScale + (i * yScale), xScale, yScale);
            ctx.drawImage(this.right, xMax, yPad + yScale + (i * yScale), xScale, yScale);
        }
        
    },
    
    displayInventory: function () {
        'use strict';
        var i, j, k;
        
        if (this.showHud) {
            ctx.drawImage(this.coin, canvas.width - 68, 20, 32, 32);
            ctx.font = '16px Arial';
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.fillText("x" + this.coinCount, canvas.width - 34, 44);
            ctx.drawImage(this.key, canvas.width - 68, 60, 32, 32);
            ctx.fillText("x" + this.keyCount, canvas.width - 34, 70);
            
            for (i = 0; i < this.heartCount; i += 1) {
                if (i <= 9) {
                    ctx.drawImage(this.heart, 20 + (24 * i), 20, 32, 32);
                }
                if (i >= 10) {
                    ctx.drawImage(this.heart, 20 + (24 * (i - 10)), 44, 32, 32);
                }
            }
            
            this.window(280, 20, 16, 16, 344, 84, true);
            this.window(368, 20, 16, 16, 432, 84, true);
            
        }
        
        if (this.showInventory) {
            this.window(20, 20, 16, 16, canvas.width - 294, canvas.height - 40, true);
            this.window(canvas.width - 260, 20, 16, 16, canvas.width - 36, canvas.height - 264, true);
            this.window(canvas.width - 260, canvas.height - 232, 16, 16, canvas.width - 36, canvas.height - 40, true);
            
            for (k = 0; k < 3; k += 1) {
                for (j = 0; j < 6; j += 1) {
                    
                    this.window(40 + (j * 96), 40 + (k * 96), 16, 16, 40  + (j * 96) + 16 * 4, 40 + (k * 96) + 16 * 4);
                    
                }
            }
            
        }
        
    },
    
    displayText: function (text, windowed) {
        'use strict';
        
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        
        if (windowed) {
            
            this.setRefreshArea("Window");
            
            this.window(20, canvas.height - 228, 16, 16, canvas.width - 36, canvas.height - 36, true);
            
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.strokeText(text, 36, canvas.height - 198);
            ctx.fillText(text, 36, canvas.height - 198);
            
            
        } else {
        
            ctx.font = '24px Arial';
            ctx.strokeText(text, canvas.width / 2 - 50, canvas.height / 2);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.fillText(text, canvas.width / 2 - 50, canvas.height / 2);
            
        }
    }
    
};
