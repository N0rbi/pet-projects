from gameObject.staticGameObject import StaticGameObject


class CargoBay(StaticGameObject):

    def __init__(self, x, y, capacity):
        super().__init__('assets/cargo_bay.png', x, y)

        self.capacity = capacity        # kg
        self.cargo = []                 # list of all minerals contained
        self.cargo_mass = 0             # kg
        self.status = 0                 # percentage