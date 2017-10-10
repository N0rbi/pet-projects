from gameObject.staticGameObject import StaticGameObject


class Cooler(StaticGameObject):

    def __init__(self, x, y, cooling_rate):
        super().__init__(x, y, 'assets/cooler.png')

        self.cooling_rate = cooling_rate