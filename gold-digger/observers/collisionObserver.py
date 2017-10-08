from observers.observer import Observer
import itertools

class CollisionObserver(Observer):

    def observe(self, events, objects=[]):
        result = []
        for a,b in itertools.product(objects, repeat=2):
            if a==b:
                continue
            if a.collider.colliderect(b.collider):
                result.append(Collision(a,b))
        return result


class Collision():

    def __init__(self, a, b):
        self.a = a
        self.b = b
