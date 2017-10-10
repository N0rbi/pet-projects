from game_mode_constants import COLLISION
from responders.responder import Responder
from observers.collisionObserver import Collision


class TankCollidedResponder(Responder):

    def __init__(self, tank):
        self.__tank = tank

    def respond(self, observations):
        if COLLISION:
            for observation in observations:
                if isinstance(observation, Collision):
                    other = observation.a if observation.a != self.__tank else observation.b
                    if other.y > self.__tank.y:
                        self.__tank.prevent_falling(other)
                    else:
                        print("UNDER")
        pass
