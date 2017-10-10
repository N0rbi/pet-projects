from gameObject.gameObject import GameObject


class DynamicGameObject(GameObject):
    def __init__(self, x, y, m):
        super().__init__(x, y)
        self.gravity = 200.
        self.m = m

        self.forces_x = []
        self.forces_y = [self.gravity*self.m]

        self.__vx = 0
        self.__vy = 0

    def _updatePosition(self, dt):
        ax = sum(self.forces_x)/self.m
        ay = sum(self.forces_y)/self.m

        self.__vx += ax * dt
        self.__vy += ay * dt

        self.x += self.__vx * dt
        self.y += self.__vy * dt

        self.reset_forces()

    def reset_forces(self):
        self.forces_x = []
        self.forces_y = [self.gravity*self.m]

    def tick(self, dt):
        self._updatePosition(dt)
