var entryX, entryY, Grid, HUD;

var Storage = {
    
    save: function () {
        
        localStorage.setItem("HUD.heartCount", HUD.heartCount);
        localStorage.setItem("Grid.location", Grid.location);
        localStorage.setItem("Grid.previousLocation", Grid.previousLocation);
        localStorage.setItem("Grid.floor", Grid.floor);
        console.log("Saved to localStorage");
        
    },
    
    load: function () {
        
        HUD.heartCount = parseInt(localStorage.getItem("HUD.heartCount")) || 5;
        Grid.location = localStorage.getItem("Grid.location") || "Overworld";
        Grid.previousLocation = localStorage.getItem("Grid.previousLocation") || "";
        Grid.floor = parseInt(localStorage.getItem("Grid.floor")) || 0;
        
    },
    
    clear: function () {
        localStorage.clear();
    }
    
};
