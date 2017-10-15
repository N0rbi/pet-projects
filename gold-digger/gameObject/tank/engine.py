from gameObject.staticGameObject import StaticGameObject


class Engine(StaticGameObject):

    def __init__(self, x, y, lift, side_force):
        super().__init__(x, y, 'assets/engine.png')
        self.lift = lift
        self.side_force = side_force
        self.temp = 20.
        self.heating_rate = 1.0