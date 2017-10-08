from gameObject.dynamicGameObject import DynamicGameObject
from gameObject.tank.drill import Drill
from gameObject.tank.engine import Engine
from gameObject.tank.wheels import Wheels


class Tank(DynamicGameObject):

    def __init__(self, x, y, m):
        self.__engine = Engine(0, 0, 20.)
        self.__drill = Drill(0, 0)
        self.__wheel = Wheels(0, 0)
        self.__wheelOffset = (0, 10)
        self.__drillOffset = (64, 0)
        super().__init__(x, y, m)


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

    def throttle_up(self):
        self.forces_y.append(-self.__engine.lift)

    def throttle_down(self):
        self.forces_y.append(self.__engine.lift)

    def throttle_left(self):
        self.forces_x.append(-self.__engine.lift)

    def throttle_right(self):
        self.forces_x.append(self.__engine.lift)