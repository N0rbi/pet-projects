from gameObject.staticGameObject import StaticGameObject


class Frame(StaticGameObject):
    def __init__(self, x, y, hp):
        super().__init__(x, y, 'assets/frame.png')
        self.hp = hp                            # percentage
        self.velocity_threshold = 40.
        self.rate_of_injury = 10.               # percentage

    def lose_health(self):
        self.hp -= self.rate_of_injury

    def flash_red(self):
        pass