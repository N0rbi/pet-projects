from responders.responder import Responder
from observers.collisionObserver import Collision
from math import floor


class TankCollidedResponder(Responder):

    def __init__(self, tank):
        self.__tank = tank

    def respond(self, observations):
        try:
            y_limit = min(map(self.get_collider, filter(self.filter_collosion, observations)), key=self.get_y)
        except ValueError:
            return

        if y_limit.y > self.__tank.y - self.__tank.h:
            self.__tank.forces_y.append(-200*self.__tank.m)
            self.__tank.y = y_limit.y - self.__tank.h

    def filter_collosion(self, obj):
        return isinstance(obj, Collision)

    def get_collider(self, obj):
        if obj.a == self.__tank:
            return obj.b
        elif obj.b == self.__tank:
            return obj.a

    def get_y(self, obj):
        return obj.y
