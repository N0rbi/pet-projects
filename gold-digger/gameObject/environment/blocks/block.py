from gameObject.staticGameObject import StaticGameObject


class Block(StaticGameObject):
    def __init__(self, x, y, imgPath, value, density, center):
        super().__init__(x, y, imgPath)

        self.value = value
        self.density = density
        self.center = center
