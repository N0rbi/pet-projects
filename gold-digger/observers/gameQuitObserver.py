import pygame
from observers.observer import Observer
import observers.observationConstants as const


class GameQuitObserver(Observer):

    def observe(self, events, objects=[]):
        for event in events:
            if event.type == pygame.QUIT:
                print(event)
                return [const.GAME_QUIT]
        return []
