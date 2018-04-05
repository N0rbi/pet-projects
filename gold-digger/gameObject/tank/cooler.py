from gameObject.staticGameObject import StaticGameObject


class Cooler(StaticGameObject):

    def __init__(self, x, y, cooling_rate):
        super().__init__('assets/cooler.png', x, y)

        self.cooling_rate = cooling_rate