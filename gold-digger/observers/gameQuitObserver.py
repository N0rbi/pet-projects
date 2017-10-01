import pygame
from observers.observer import Observer
import observers.observationConstants as const


class GameQuitObserver(Observer):

    def observe(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                return [const.GAME_QUIT]
        return []
