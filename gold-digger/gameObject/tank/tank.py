from gameObject.gameObject import GameObject
from gameObject.tank.drill import Drill
from gameObject.tank.engine import Engine
from gameObject.tank.wheels import Wheels


class Tank(GameObject):

    def __init__(self, x, y):
        self.__engine = Engine(0, 0)
        self.__drill = Drill(0,0)
        self.__wheel = Wheels(0,0)
        self.__wheelOffset = (0,10)
        self.__drillOffset = (64,0)
        self.x = x
        self.y = y

    @property
    def x(self):
        return self.__x

    @x.setter
    def x(self, value):
        self.__engine.x = value
        self.__drill.x = value + self.__drillOffset[0]
        self.__wheel.x = value + self.__wheelOffset[0]
        self.__x = value

    
    @property
    def y(self):
        return self.__y

    @y.setter
    def y(self, value):
        self.__engine.y = value
        self.__drill.y = value + self.__drillOffset[1]
        self.__wheel.y = value + self.__wheelOffset[1]
        self.__y = value

    def render(self, screen):
        self.__engine.render(screen)
        self.__wheel.render(screen)
        self.__drill.render(screen)
