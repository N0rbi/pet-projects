import pygame
from gameObject.gameObject import GameObject
from gameObject.gameObject import globalOffset


class StaticGameObject(GameObject):

    def __init__(self, x, y, imgPath):
        self.x = x
        self.y = y
        self.renderable = pygame.image.load(imgPath)
        self.renderable = pygame.transform.scale(self.renderable, (64, 64))

    def render(self, screen):
        screen.blit(self.renderable, (globalOffset[0]+self.x, globalOffset[1]+self.y))
