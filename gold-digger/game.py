import pygame
import time
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
        self.gameObjects = []

    # Runs actions based on observed events
    def _responders(self):
        for responder in self.responders:
            responder.respond(self.observations)

    # Run the tick method of the dynamic objects
    def _digestDynamic(self, deltatime):
        pass

    # Detects events
    def _observers(self):
        events = pygame.event.get()
        for observer in self.observers:
            self.observations.extend(observer.observe(events, self.gameObjects))

    # Renders content to the screen
    def _render(self):
        [o.render(self.__pgScreen) for o in self.gameObjects]

    # Game loop
    def tick(self):
        lasttime = time.time()
        while self.__running:
            self._responders()
            self.observations = []
            self._digestDynamic(time.time()-lasttime)
            lasttime = time.time()
            self._observers()
            self.__pgScreen.fill(self.__devBlue)
            self._render()
            pygame.display.flip()
            yield self.observations
