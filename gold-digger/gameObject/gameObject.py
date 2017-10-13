import pygame


class GameObject:
    def __init__(self, x=0, y=0, w=128, h=128):
        self.w = w
        self.h = h
        self.x = x
        self.y = y

    @property
    def collider(self):
        return pygame.Rect(self.x, self.y, self.w, self.h)

    def render(self, screen):
        pass

GLOBAL_OFFSET = [0, 0]
