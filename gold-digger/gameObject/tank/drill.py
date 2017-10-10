from gameObject.staticGameObject import StaticGameObject


class Drill(StaticGameObject):
    def __init__(self, x, y, drill_rate):
        super().__init__(x, y, 'assets/t_drill.png')

        self.drill_rate = drill_rate
