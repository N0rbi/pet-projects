from gameObject.staticGameObject  import GLOBAL_OFFSET
from gameObject.dynamicGameObject import DynamicGameObject
from gameObject.tank.cargo_bay import CargoBay
from gameObject.tank.cooler import Cooler
from gameObject.tank.engine import Engine
from gameObject.tank.fuel_tank import FuelTank
from gameObject.tank.frame import Frame
from game_mode_constants import *


class Tank(DynamicGameObject):
    def __init__(self, x, y, m):
        self.frame = Frame(0, 0, 100)
        self.engine = Engine(0, 0, 200000., 200000.)
        self.cooler = Cooler(0, 0, 10.)
        self.fuel_tank = FuelTank(0, 0, 10.)
        self.cargo_bay = CargoBay(0, 0, 10.)
        self.ground = None

        # self.__drill_right = Drill(100, 0, 12.)

        self.on_ground = False
        self.__x = x
        self.__y = y

        self.elasticity = 0.85

        super().__init__(x, y, m)

    @property
    def x(self):
        return self.__x

    @x.setter
    def x(self, value):
        self.frame.x = value
        self.engine.x = value
        self.cooler.x = value
        self.fuel_tank.x = value
        self.cargo_bay.x = value

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
        self.frame.y = value
        self.engine.y = value
        self.cooler.y = value
        self.fuel_tank.y = value
        self.cargo_bay.y = value

        if OFFSET:
            GLOBAL_OFFSET[1] = value - 300 + self.h/2
        else:
            GLOBAL_OFFSET[1] = 0
        self.__y = value
        self.on_ground = False

    def render(self, screen):
        self.frame.render(screen)
        self.engine.render(screen)
        self.cooler.render(screen)
        self.fuel_tank.render(screen)
        self.cargo_bay.render(screen)

    def throttle_up(self):
        self.forces_y.append(-self.engine.lift)

    def throttle_down(self):
        self.forces_y.append(self.engine.lift)

    def throttle_left(self):
        self.forces_x.append(-self.engine.side_force)

    def throttle_right(self):
        self.forces_x.append(self.engine.side_force)

    def throttle_horizontal(self, value):
        self.forces_x.append(self.engine.side_force*value)

    def throttle_vertical(self, value):
        self.forces_y.append(self.engine.lift*value)

    def get_hp(self):
        hp = self.frame.hp
        return str(int(hp))

    def engine_cooling(self, dt):
        self.engine.temp -= self.cooler.cooling_rate * dt
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
        if self.cargo_bay.cargo_mass + mineral_o.mass <= self.cargo_bay.capacity:
            self.cargo_bay.cargo.append(mineral_o)
            self.cargo_bay.cargo_mass += mineral_o.mass
            self.cargo_bay.status = 100 * self.cargo_bay.cargo_mass / self.cargo_bay.capacity

        else:
            print('CARGO FULL YOU IDIOT!')

