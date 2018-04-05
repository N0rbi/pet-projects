from gameObject.staticGameObject import StaticGameObject


class FuelTank(StaticGameObject):
    def __init__(self, x, y, capacity):
        super().__init__('assets/fuel_tank.png', x, y)
        self.capacity = capacity