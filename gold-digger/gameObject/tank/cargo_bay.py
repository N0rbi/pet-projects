from gameObject.staticGameObject import StaticGameObject


class CargoBay(StaticGameObject):

    def __init__(self, x, y, capacity):
        super().__init__(x, y, 'assets/cargo_bay.png')

        self.capacity = capacity        # kg
        self.cargo = []                 # list of all minerals contained
        self.cargo_mass = 0             # kg
        self.status = 0                 # percentage