var mainCam, THREE, ctx, canvas, i;

var HUD = {
    
    init: function () {
        this.showInventory = false;
        this.showHud = true;
        this.hearts = [];
        this.health(true, 0);
        this.inventoryGrid = [];
        this.refreshScreen = true;
        
        this.topLeft = new Image();
        this.top = new Image();
        this.topRight = new Image();
        this.left = new Image();
        this.right = new Image();
        this.bottomLeft = new Image();
        this.bottom = new Image();
        this.bottomRight = new Image();
        this.topLeft.src = 'sprites/topLeft.png';
        this.top.src = 'sprites/top.png';
        this.topRight.src = 'sprites/topRight.png';
        this.bottomLeft.src = 'sprites/bottomLeft.png';
        this.bottom.src = 'sprites/bottom.png';
        this.bottomRight.src = 'sprites/bottomRight.png';
        this.left.src = 'sprites/left.png';
        this.right.src = 'sprites/right.png';
    },
    
    refresh: function () {
        if (this.refreshScreen) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    },
    
    health: function (update, count) {
        //this.heartCount += count;
        if (update) {
            this.heartCount += count;
            this.hearts = [];
            for (i = 0; i < this.heartCount; i += 1) {
                this.hearts[i] = new Image();
                this.hearts[i].src = 'sprites/heart.png';
            }
        }
    },

    window: function (xPad, yPad, xScale, yScale, xMax, yMax, background) {
        
        if (background) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(20,170,225,0.75)';
            ctx.fillRect(xPad + 6, yPad + 6, xMax - xPad + 6, yMax - yPad + 6);
            ctx.closePath();
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
        var i, j, k;
        if (this.showHud) {
            for (i = 0; i < this.hearts.length; i += 1) {
                if (i <= 9) {
                    ctx.drawImage(this.hearts[i], 20 + (22 * i), 20, 32, 32);
                }
                if (i >= 10) {
                    ctx.drawImage(this.hearts[i], 20 + (22 * (i - 10)), 42, 32, 32);
                }
            }
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
    }
    
};