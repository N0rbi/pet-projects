import observers.keyboardConstants as keys
from responders.responder import Responder


class MoveTankResponder(Responder):

    def __init__(self, tank):
        self.__tank = tank

    def respond(self, observations):
        if keys.UP in observations:
            self.__tank.throttle_up()
        if keys.DOWN in observations:
            self.__tank.throttle_down()
        if keys.LEFT in observations:
            self.__tank.throttle_left()
        if keys.RIGHT in observations:
            self.__tank.throttle_right()
