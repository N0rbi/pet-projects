import pygame

class DynamicGameObject:
    def __init__(self, m, x=0, y=0, w=64, h=64):
        self.gravity = 130.;
        self.damping = 250.;

        self.m = m

        self.w = w
        self.h = h
        self.x = x
        self.y = y

        self.vx = 0
        self.vy = 0

        self.forces_x = [self.damping * (-self.vx)]
        self.forces_y = [self.gravity*self.m]

        self.rect = pygame.Rect(self.x, self.y, self.w, self.h)

    def _updatePosition(self, dt):
        ax = sum(self.forces_x)/self.m
        ay = sum(self.forces_y)/self.m

        self.vx += ax * dt
        self.vy += ay * dt

        self.x += self.vx * dt
        self.y += self.vy * dt

        self.reset_forces()



    def reset_forces(self):
        self.forces_x = [self.damping * (-self.vx)]
        self.forces_y = [self.gravity*self.m]

    def reset_y(self):
        self.forces_y = [self.gravity*self.m]

    def reset_x(self):
        self.forces_x = [0]

    def tick(self, dt):
        self._updatePosition(dt)
