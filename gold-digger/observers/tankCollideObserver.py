from observers.collisionObserver import Collision
from observers.observer import Observer

class TankCollideObserver(Observer):

    def __init__(self, tank):
        self.__tank = tank

    def observe(self, events, objects=[]):
        result = []
        for o in objects:
            if o != self.__tank and self.__tank.collider.colliderect(o.collider):
                result.append(Collision(self.__tank, o))
        return result
