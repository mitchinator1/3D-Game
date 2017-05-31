# 3D-Game

Link to view test.
https://rawgit.com/mitchinator1/3D-Game/master/index.html

Currently working on Camera movement. Plan is to add floating points away from the player to do a hitTest for the camera Boundaries.

Set up boundary blocks, to avoid confusion with regular blocks and camera being unneccessary locked.

Example:
</br>
grid =</br>
[[1, 1, 1, 1, 1],
 [1, 0, 0, 0, 1],
 [1, 0, 0, 0, 1],
 [1, 0, 0, 0, 1],
 [1, 0, 0, 0, 1],
 [1, 1, 1, 1, 1]]
 
 i = y and j = x </br>
 when i = 0, all blocks boundary = true.</br>
 when j = 0 or j = grid[i].length - 1, blocks boundary = true.</br>
 when i = grid.length - 1, all blocks boundary = true.</br>
 
 Only potential issue is with odd shaped rooms. Avoidable for y coordinate by having <b>only</b> first and last row have boundarys.
 Issue may arise with different column numbers.
 
 for example:
 
 test
