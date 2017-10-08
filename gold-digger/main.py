from game import Game
import pygame
from gameObject.staticGameObject import StaticGameObject
from gameObject.tank.tank import Tank
import random
# Main handles file loading (possible network managing), and the configuration of the game (images, sounds)


def getObservers():
    from observers.gameQuitObserver import GameQuitObserver
    from observers.keystrokeObserver import KeyStrokeObserver
    import observers.keyboardConstants as keys
    observers = []
    observers.append(GameQuitObserver())
    observers.append(KeyStrokeObserver(pygame.K_w, keys.UP))
    observers.append(KeyStrokeObserver(pygame.K_a, keys.LEFT))
    observers.append(KeyStrokeObserver(pygame.K_s, keys.DOWN))
    observers.append(KeyStrokeObserver(pygame.K_d, keys.RIGHT))
    observers.append(KeyStrokeObserver(pygame.K_UP, keys.UP))
    observers.append(KeyStrokeObserver(pygame.K_LEFT, keys.LEFT))
    observers.append(KeyStrokeObserver(pygame.K_DOWN, keys.DOWN))
    observers.append(KeyStrokeObserver(pygame.K_RIGHT, keys.RIGHT))
    return observers

tank = Tank(30, 30)

def getResponders():
    from responders.gameQuitResponder import GameQuitResponder
    from responders.moveTankResponder import MoveTankResponder
    responders = []
    responders.append(GameQuitResponder())
    responders.append(MoveTankResponder(tank))
    return responders

game = Game(800,600)
game.observers = getObservers()
game.responders = getResponders()
game.gameObjects = [tank]



for gameStatus in game.tick():
    pass
