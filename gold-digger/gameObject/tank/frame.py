from gameObject.staticGameObject import StaticGameObject


class Frame(StaticGameObject):
    def __init__(self, x, y, hp):
        super().__init__('assets/frame.png', x, y)
        self.hp = hp                            # percentage
        self.velocity_threshold = 200.
        self.rate_of_injury = 10.               # percentage

    def lose_health(self):
        self.hp -= self.rate_of_injury

    def flash_red(self):
        pass

    def refresh_collider(self):
        self.rect.center = (self.x, self.y)