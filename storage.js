var entryX, entryY, grid;

var Storage = {
    
    save: function () {
        localStorage.setItem("grid.location", grid.location);
        localStorage.setItem("hud.heartCount", hud.heartCount);
        localStorage.setItem("grid.previousLocation", grid.previousLocation);
        console.log("Saved to localStorage");
    },
    
    load: function () {
        hud.heartCount = parseInt(localStorage.getItem("hud.heartCount")) || 4;
        grid.location = localStorage.getItem("grid.location") || "Overworld";
        grid.previousLocation = localStorage.getItem("grid.previousLocation");
    }
    
};