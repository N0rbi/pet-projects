import pygame
import time
import sys
from gameObject.environment.blocks.blockFactory import BlockFactory

class gameEngine02:
    __devBlue = (50, 110, 255)
    __devRed = (255, 0, 0)
    __devBlack = (0, 0, 0)
    __devGray = (125, 125, 125)

    def __init__(self, width, height, tank, start_x_blocks = 400, start_y_blocks = 400, unit_blocks = 64):
        pygame.init()
        self.__size = self.__width, self.__height = width, height
        self.__pgScreen = pygame.display.set_mode(self.__size)
        self.__running = True

        self.staticObjects = self.generate_ground(start_x_blocks, start_y_blocks, unit_blocks)

        self.tankObject = tank
        self.interfaceObjects = []

        self.clock = pygame.time.Clock()
        self.fps = 60;
        self.dt = 1/self.fps

        self.player_move = [pygame.K_a, pygame.K_d, pygame.K_w, pygame.K_s]

    def mainloop(self):

        got_hit = False
        while self.__running:

            # Outside Event handler:
            self.event_handler()

            # Physics
            self.tankObject.tick(self.dt)

            # Obstacle detection:
            # Restart every loop so we can update potential obstacles.
            # self.staticObjects_refresh()
            obstacle_group = []
            obstacle_group = pygame.sprite.Group()
            for tile in self.staticObjects:
                obstacle_group.add(tile)
            self.tankObject.frame.refresh_collider()
            hit = pygame.sprite.spritecollide(self.tankObject.frame, obstacle_group, False)

            #for obstacle in hit:
            #    y_top = obstacle.rect.center

            if hit and not got_hit:
                got_hit = True
                print("Collision detected!!")

                self.tankObject.vy *= -1*self.tankObject.elasticity;

                if self.tankObject.vy >= self.tankObject.frame.velocity_threshold:
                    self.tankObject.frame.lose_health()
                    #For now this is HP display:
                    self.interfaceObjects[0].color = self.__devRed

            elif not hit and got_hit:
                got_hit = False
                print("Clear of osbtacle.")
                self.interfaceObjects[0].color = self.__devBlack



            # Update Interface: will have to generalize later:
            self.interfaceObjects[0].update_text("HP:"+ self.tankObject.get_hp())

            # Update Screen
            self.__pgScreen.fill(self.__devGray)
            self._render()
            pygame.display.flip()
            self.clock.tick(self.fps)

        return

    def event_handler(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                self.__running = True
                sys.exit("Program ended by user.")
            if event.type == pygame.KEYDOWN and event.key == pygame.K_ESCAPE:
                pygame.quit()
                self.__running = True
                sys.exit("Program ended by user.")

        key = pygame.key.get_pressed()

        for i in range(2):
            if key[self.player_move[i]]:
                self.tankObject.throttle_horizontal([-1, 1][i])

        for i in range(2):
            if key[self.player_move[2:4][i]]:
                self.tankObject.throttle_vertical([-1, 1][i])

    def generate_ground(self, start_x, start_y, unit):
        bf = BlockFactory(start_x, start_y, unit)
        blocks = []
        for i in range(-15, 15):
            for j in range(4):
                blocks.append(bf.get_block(i, j))
        return blocks

    # Renders content to the screen
    def _render(self):
        # 1) static objects:
        [o.render(self.__pgScreen) for o in self.staticObjects]

        # 2) player:
        self.tankObject.render(self.__pgScreen)

        # 3) UI:
        [o.render(self.__pgScreen) for o in self.interfaceObjects]