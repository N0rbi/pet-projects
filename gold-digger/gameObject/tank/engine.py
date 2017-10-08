from gameObject.staticGameObject import StaticGameObject


class Engine(StaticGameObject):

    def __init__(self, x, y, lift):
        super().__init__(x, y, 'assets/t_engine.png')

        self.lift = lift