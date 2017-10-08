from gameObject.staticGameObject import StaticGameObject


class Wheels(StaticGameObject):

    def __init__(self, x, y):
        super().__init__(x, y, 'assets/t_wheels.png')
