import pygame

class Game():
    __devBlue = (0, 0, 255)

    def __init__(self, width, height):
        pygame.init()
        self.__size = self.__width, self.__height = width, height
        self.__pgScreen = pygame.display.set_mode(self.__size)
        self.__running = True
        self.responders = []
        self.observers = []
        self.observations = []

    # Runs actions based on observed events
    def _responders(self):
        for responder in self.responders:
            responder.respond(self.observations)

    # Detects events
    def _observers(self, gameObjects):
        for observer in self.observers:
            self.observations.extend(observer.observe())

    # Renders content to the screen
    def _render(self, gameObjects):
        [o.render(self.__pgScreen) for o in gameObjects]

    # Game loop
    def tick(self, gameObjects = []):
        while self.__running:
            self._responders()
            self.observations = []
            self._observers(gameObjects)
            self._render(gameObjects)
            self.__pgScreen.fill(self.__devBlue)
            self._render(gameObjects)
            pygame.display.flip()
            yield self.observations
