from gameObject.staticGameObject import StaticGameObject


class FuelTank(StaticGameObject):
    def __init__(self, x, y, capacity):
        super().__init__(x, y, 'assets/fuel_tank.png')
        self.capacity = capacity