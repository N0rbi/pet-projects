from gameObject.staticGameObject import StaticGameObject


class Frame(StaticGameObject):
    def __init__(self, local_x = 0, local_y=0, hp = 100):
        super().__init__('assets/frame.png', local_x, local_y)
        self.hp = hp                            # percentage
        self.velocity_threshold = 200.
        self.rate_of_injury = 10.               # percentage

    def lose_health(self):
        self.hp -= self.rate_of_injury

    def flash_red(self):
        pass

    def refresh_collider(self):
        self.rect.center = (self.x, self.y)

    def tick(self, dt):
        pass