from gameObject.staticGameObject import StaticGameObject


class Engine(StaticGameObject):

    def __init__(self, x, y, lift):
        super().__init__(x, y, 'assets/engine.png')

        self.lift = lift
        self.temp = 20.
        self.heating_rate = 1.0