from gameObject.staticGameObject import StaticGameObject


class Cooler(StaticGameObject):

    def __init__(self, local_x=0, local_y=0, cooling_rate=1.):
        super().__init__('assets/cooler.png', local_x, local_y)

        self.cooling_rate = cooling_rate

    def tick(self, dt):
        pass