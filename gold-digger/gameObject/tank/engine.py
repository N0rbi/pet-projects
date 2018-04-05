from gameObject.staticGameObject import StaticGameObject


class Engine(StaticGameObject):

    def __init__(self, local_x=0, local_y=0,
                 lift=200000., side_force=200000.,
                 heating_rate=1.0, boost_lift_bonus = 1.3):
        super().__init__('assets/engine.png', local_x, local_y)
        self.lift = lift
        self.side_force = side_force
        self.temp = 22.                             #[deg]
        self.heating_rate = heating_rate            #[deg/s]
        self.boost_lift_bonus = boost_lift_bonus    #[-]

        self.idle_consumption = 1 / 3.                     #[fuel/s]
        self.consumption = self.idle_consumption

        self.sound = None
        self.smoke = None

    def boost_lift(self):
        self.lift *= self.boost_lift_bonus

    def reset_lift(self):
        self.lift /= self.boost_lift_bonus

    def tick(self, dt):
        self.temp += self.heating_rate * dt