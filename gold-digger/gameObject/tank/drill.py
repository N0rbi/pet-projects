from gameObject.staticGameObject import StaticGameObject


class Drill(StaticGameObject):
    def __init__(self, x, y, drill_rate):
        super().__init__('assets/drill_right.png', x, y)

        self.drill_rate = drill_rate
        self.drill_level = 0               # compare to drilled mineral level
