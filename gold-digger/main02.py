from gameObject.interface.text_display import TextObject
from gameObject.tank.tank import Tank
from gameEngine02 import gameEngine02

tank = Tank(400, 100, 0.1)

# Define: terrain, Terrain class, procedural generation.

game = gameEngine02(800, 600, tank)
hp_display = TextObject(50, 500, font_size=15, text="HP:")
fuel_display = TextObject(50, 475, font_size=15, text="Fuel:" + tank.get_fuel_level())

game.interfaceObjects.append(hp_display)
game.interfaceObjects.append(fuel_display)

for gameStatus in game.mainloop():
    pass
