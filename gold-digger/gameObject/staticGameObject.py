import pygame
from gameObject.gameObject import GameObject


class StaticGameObject(GameObject):

    def __init__(self, x, y, imgPath):
        self.x = x
        self.y = y
        self.renderable = pygame.image.load(imgPath)

    def render(self, screen):
        screen.blit(self.renderable, self.renderable.get_rect())
