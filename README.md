# 3D-Game

Link to view test.
https://rawgit.com/mitchinator1/3D-Game/master/index.html

<b><u>Change log</u></b>

<b>Jun 5, 2017</b>
- Added Dungeon 1 map to the grid.
- Added dungeon navigation, via setDungeonLocation().
- Began layout of Dungeon 2 map.

<b>Jun 2, 2017</b>
- Added Dungeon 1 map idea.
- Flipped rendering of Y-Axis. It was fine for testing, but it's getting confusing for adding multiple maps.
- Flipped level arrays to match Y-Axis flip.

<b>Jun 1, 2017</b>
- Fixed a huge unneccesary loop in the main loop. Blocks were being added and removed every call.
- Fixed camera movement, and set different movement patterns based on location.
- Updated grid.setLocation("location name") function, as well as data updated in hitDetect.
- Added fog, with differing amounts based on location.
