from gameObject.staticGameObject import StaticGameObject


class Drill(StaticGameObject):
    def __init__(self, x, y, drill_rate):
        super().__init__(x, y, 'assets/drill_right.png')

        self.drill_rate = drill_rate
        self.drill_level = 0               # compare to drilled mineral level
