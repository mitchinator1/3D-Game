# 3D-Game

Link to view test.
https://rawgit.com/mitchinator1/3D-Game/master/index.html

<b><u>Change log</u></b>

<b>Jun 12, 2017</b>
- Added location entry text.
- Added text and text boxes.
- Added objects to grid array, allowing more properties. Easier to seperate Geometries and Materials in meshes, add different states, etc.
- Added treasure chests, as well as contents.
- Added locked doors, and keys.
- Implemented an easier way to toggle button presses.
- Added a function to add coins, and not exceed the current maximum.
- Added signs.

<b>Jun 9, 2017</b>
- Completely restructured the way the grid is written, added, and rendered.
- Now avoiding multiple regenerations of map arrays, instead just reference back to them.
- Allowed for more precise entry locations.
- Grid object is now easier to work with, as there is just one array, instead of multiple to handle hitDetect, player entry points, and rendering of the grid.
- Camera is based solely of player position upon entry. More dynamic and tidier.
- Had unneccessary instances of objects being created. Now all objects are referenced as "Grid" instead of "grid".

<b>Jun 6, 2017</b>
- Added dynamic positioning based on grid length in dungeons. Still need to implement a stricter door linking, but this will do for now.

<b>Jun 5, 2017</b>
- Added Dungeon 1 map to the grid.
- Added dungeon navigation, via setDungeonLocation().
- Began layout of Dungeon 2 map.
- Added further depthed Grid. ex. grid[map][floor][y][x]

<b>Jun 2, 2017</b>
- Added Dungeon 1 map idea.
- Flipped rendering of Y-Axis. It was fine for testing, but it's getting confusing for adding multiple maps.
- Flipped level arrays to match Y-Axis flip.

<b>Jun 1, 2017</b>
- Fixed a huge unneccesary loop in the main loop. Blocks were being added and removed every call.
- Fixed camera movement, and set different movement patterns based on location.
- Updated grid.setLocation("location name") function, as well as data updated in hitDetect.
- Added fog, with differing amounts based on location.
