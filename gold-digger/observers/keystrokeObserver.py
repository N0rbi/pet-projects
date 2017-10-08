import pygame
from observers.observer import Observer

class KeyStrokeObserver(Observer):

    def __init__(self, key, action):
        self.__key = key
        self.__action = action
        self.__pressed = False

    def observe(self, events, objects=[]):
        for event in events:
            if event.type == pygame.KEYDOWN and event.key == self.__key:
                self.__pressed = True
                break
            elif event.type == pygame.KEYUP and event.key == self.__key:
                self.__pressed = False
        if self.__pressed:
            return [self.__action]
        return []
