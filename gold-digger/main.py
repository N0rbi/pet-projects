from game import Game
import pygame
from gameObject.staticGameObject import StaticGameObject
from gameObject.environment.blocks.blockFactory import BlockFactory
from gameObject.tank.tank import Tank

# Main handles file loading (possible network managing), and the configuration of the game (images, sounds)


def getObservers():
    from observers.gameQuitObserver import GameQuitObserver
    from observers.keystrokeObserver import KeyStrokeObserver
    from observers.collisionObserver import CollisionObserver
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
    observers.append(CollisionObserver())
    return observers


tank = Tank(400, 300, 1.)


def getResponders():
    from responders.gameQuitResponder import GameQuitResponder
    from responders.moveTankResponder import MoveTankResponder
    from responders.tankCollidedResponder import TankCollidedResponder
    responders = []
    responders.append(GameQuitResponder())
    responders.append(MoveTankResponder(tank))
    responders.append(TankCollidedResponder(tank))
    return responders


def ground():
    bf = BlockFactory(400, 400, 64)
    blocks = []
    for i in range(-10, 10):
        for j in range(3):
            blocks.append(bf.get_block(i,j))
    return blocks



game = Game(800, 600)
game.observers = getObservers()
game.responders = getResponders()
game.gameObjects = [tank]
game.gameObjects.extend(ground())

for gameStatus in game.tick():
    pass
