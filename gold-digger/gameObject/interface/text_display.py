import pygame


class TextObject:
    def __init__(self, x, y, font_size=15, text="Add text!", color=(0, 0, 0)):
        pygame.font.init()
        self.x = x
        self.y = y
        self.font_size = font_size
        self.font = pygame.font.SysFont("monospace", self.font_size)

        self.text = text;
        self.color = color

    def render(self, screen):
        label = self.font.render(self.text, 1, self.color)
        screen.blit(label, (self.x, self.y))

    def update_text(self, new_text):
        self.text = new_text;