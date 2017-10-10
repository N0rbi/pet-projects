from gameObject.gameObject import GLOBAL_OFFSET
from gameObject.dynamicGameObject import DynamicGameObject
from gameObject.tank.cargo_bay import CargoBay
from gameObject.tank.cooler import Cooler
from gameObject.tank.drill import Drill
from gameObject.tank.engine import Engine
from gameObject.tank.fuel_tank import FuelTank
from gameObject.tank.frame import Frame
from game_mode_constants import *


class Tank(DynamicGameObject):
    def __init__(self, x, y, m):
        self.__frame = Frame(0, 0, 100)
        self.__engine = Engine(0, 0, 500., 250)
        self.__cooler = Cooler(0, 0, 10.)
        self.__fuel_tank = FuelTank(0, 0, 10.)
        self.__cargo_bay = CargoBay(0, 0, 10.)

        # self.__drill_right = Drill(100, 0, 12.)

        self.on_ground = False
        self.__x = x
        self.__y = y
        super().__init__(x, y, m)

    @property
    def x(self):
        return self.__x

    @x.setter
    def x(self, value):
        self.__frame.x = value
        self.__engine.x = value
        self.__cooler.x = value
        self.__fuel_tank.x = value
        self.__cargo_bay.x = value
        # self.__drill_right.x = value

        if OFFSET:
            GLOBAL_OFFSET[0] = value - 400 + self.w/2
        else:
            GLOBAL_OFFSET[0] = 0

        self.__x = value
    
    @property
    def y(self):
        return self.__y

    @y.setter
    def y(self, value):
        self.__frame.y = value
        self.__engine.y = value
        self.__cooler.y = value
        self.__fuel_tank.y = value
        self.__cargo_bay.y = value
        # self.__drill_right.y = value

        if OFFSET:
            GLOBAL_OFFSET[1] = value - 300 + self.h/2
        else:
            GLOBAL_OFFSET[1] = 0
        self.__y = value
        self.on_ground = False

    def render(self, screen):
        self.__frame.render(screen)
        # self.__drill_right.render(screen)
        self.__engine.render(screen)
        self.__cooler.render(screen)
        self.__fuel_tank.render(screen)
        self.__cargo_bay.render(screen)

    def prevent_falling(self, o):
        self.y = (o.y - self.h)
        # prevent multiple blocks pulling it down
        if self.forces_y.count(-self.gravity*self.m) == 0:
            self.forces_y.append(-self.gravity*self.m)

    def throttle_up(self):
        self.forces_y.append(-self.__engine.lift)

    def throttle_down(self):
        self.forces_y.append(self.__engine.lift)

    def throttle_left(self):
        self.forces_x.append(-self.__engine.side_force)

    def throttle_right(self):
        self.forces_x.append(self.__engine.side_force)

    def get_hp(self):
        hp = self.__frame.hp
        return str(hp)

    def engine_cooling(self, dt):
        self.__engine.temp -= self.__cooler.cooling_rate * dt
        pass

    def drill_block(self, block_o):
        # Run drill animation:

        # Move to target block:

        # Add mineral to cargo bay:
        # if block_o == mineral
        self.collect_cargo(block_o)

        # Delete mineral:

        # game.gameObjects.remove(mineral_o)

        pass

    def collect_cargo(self, mineral_o):
        if self.__cargo_bay.cargo_mass + mineral_o.mass <= self.__cargo_bay.capacity:
            self.__cargo_bay.cargo.append(mineral_o)
            self.__cargo_bay.cargo_mass += mineral_o.mass
            self.__cargo_bay.status = 100 * self.__cargo_bay.cargo_mass / self.__cargo_bay.capacity

        else:
            print('CARGO FULL YOU IDIOT!')

