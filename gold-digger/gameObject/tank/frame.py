from gameObject.staticGameObject import StaticGameObject


class Frame(StaticGameObject):

    def __init__(self, x, y, hp):
        super().__init__(x, y, 'assets/frame.png')

        self.hp = hp