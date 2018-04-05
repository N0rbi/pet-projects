from gameObject.interface.text_display import TextObject
from gameObject.tank.tank import Tank
from gameEngine02 import gameEngine02

tank = Tank(400, 100, 0.1)

# Define: terrain, Terrain class, procedural generation.

game = gameEngine02(800, 600, tank)
hp_display = TextObject(50, 500, font_size=20, text="HP:" + tank.get_hp())

game.interfaceObjects.append(hp_display)

for gameStatus in game.mainloop():
    pass
