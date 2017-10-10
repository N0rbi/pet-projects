import pygame
from gameObject.gameObject import GameObject
from gameObject.gameObject import GLOBAL_OFFSET


class StaticGameObject(GameObject):

    def __init__(self, x, y, imgPath):
        super().__init__(x, y)
        self.x = x
        self.y = y
        self.renderable = pygame.image.load(imgPath)
        self.renderable = pygame.transform.scale(self.renderable, (128, 128))

    def render(self, screen):
        # render_x = int(self.x)
        # render_y = int(self.y)
        screen.blit(self.renderable, (self.x-GLOBAL_OFFSET[0], self.y-GLOBAL_OFFSET[1]))
