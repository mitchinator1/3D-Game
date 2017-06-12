var entryX, entryY, Grid, HUD;

var Storage = {
    
    save: function () {
        'use strict';
        
        localStorage.setItem("HUD.heartCount", HUD.heartCount);
        localStorage.setItem("Grid.location", Grid.location);
        localStorage.setItem("Grid.previousLocation", Grid.previousLocation);
        localStorage.setItem("Grid.floor", Grid.floor);
        console.log("Saved to localStorage");
        
    },
    
    load: function () {
        'use strict';
        
        HUD.heartCount = parseInt(localStorage.getItem("HUD.heartCount")) || 5;
        Grid.location = localStorage.getItem("Grid.location") || "Overworld";
        Grid.previousLocation = localStorage.getItem("Grid.previousLocation") || "";
        Grid.floor = parseInt(localStorage.getItem("Grid.floor")) || 0;
        
    },
    
    clear: function () {
        'use strict';
        
        localStorage.clear();
        console.log("localStorage is cleared");
        
    }
    
};