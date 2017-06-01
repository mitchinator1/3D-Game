# 3D-Game

Link to view test.
https://rawgit.com/mitchinator1/3D-Game/master/index.html

Fixed a huge unneccesary loop in the main look. Blocks were beig added and removed every call.

Currently working on Camera movement. Plan is to add floating points away from the player to do a hitTest for the camera Boundaries.

Set up boundary blocks, to avoid confusion with regular blocks and camera being unneccessary locked.

Example:
</br>
grid = [</br>
[1, 1, 1, 1, 1],</br>
[1, 0, 0, 0, 1],</br>
[1, 0, 0, 0, 1],</br>
[1, 0, 0, 0, 1],</br>
[1, 0, 0, 0, 1],</br>
[1, 1, 1, 1, 1]]
 
 i = y and j = x </br>
 when i = 0, all blocks boundary = true.</br>
 when j = 0 or j = grid[i].length - 1, blocks boundary = true.</br>
 when i = grid.length - 1, all blocks boundary = true.</br>
 
 Only potential issue is with odd shaped rooms. Avoidable for y coordinate by having <b>only</b> first and last row have boundarys.
 Issue may arise with different column numbers.
 
for example:
</br>
grid = [</br>
[1, 1, 1, 1, 1],</br>
[1, 0, 0, 0, 1, 1, 1],</br>
[1, 0, 0, 0, 0, 0, 0, 1],</br>
[1, 0, 0, 0, 1, 1, 1],</br>
[1, 0, 0, 0, 1],</br>
[1, 1, 1, 1, 1]]
 
 The issue that I'll run into is in grid[4][4]. By the default I've set up, this square <i>will</i> be set as a boundary, even though we can see that grid[2][7] is the real boundary, and the camera will flow much easier having that one max boundary set.
 
min x = block width * xPadding. </br>
min y = block depth * yPadding.</br>
max x = longest array within array.</br>
max y = last array within array.</br>

Updated grid.setLocation("location name") function, as well as data updated in hitDetect.
Removed grid.render() function from render loop.
