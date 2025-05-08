**Quick academic demo project.**

# Farmer, Goat, Wolf, and Cabbage Problem

The user's goal is to transfer all four characters to the right side of the river using PDDL-style commands.

**Command format:** `(plynie CHARACTER FROM TO)`  
- **CHARACTER**: one of `{farmer, goat, wolf, cabbage}`  
- **FROM** and **TO**: either `west east` (left to right) or `east west` (right to left).

Example: `(plynie farmer west east)` moves the farmer from left to right. Case-insensitive.

___
Moving any character other than the farmer implies that the farmer travels as well, since characters cannot move alone. Commands can be entered individually or in multiple lines. Clicking "Reset" restores the initial state (default: all characters on the left). Errors or invalid moves produce messages displayed in the bottom-right corner.

Made by Adam Malinowski, Poznań University of Technology, 2024.  
Special thanks to Julia Manikowska for graphical design.
