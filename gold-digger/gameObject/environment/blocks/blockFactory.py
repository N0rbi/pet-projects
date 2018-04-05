import random
from gameObject.environment.blocks.block import Block


class BlockFactory:
    def __init__(self, start_x, start_y, unit):
        self.start_x = start_x
        self.start_y = start_y
        self.unit = unit

    def get_block(self, x, y):
        block_map = [
            dict(
                url="assets/ground_tile.png",
                value=0,
                density=10
            ),
            dict(
                url="assets/ground_tile.png",
                value=0,
                density=10
            ),
            dict(
                url="assets/gold_tile.png",
                value=100,
                density=100
            ),
            dict(
                url="assets/silver_tile.png",
                value=100,
                density=100
            ),
        ]
        randint = random.randint(0,20)
        block_type = 0

        if randint < 10:
            block_type = 0
        elif randint < 15:
            block_type = 1
        elif randint < 18:
            block_type = 2
        else:
            block_type = 3

        chosen = block_map[block_type]

        return Block(self.start_x + x*self.unit+1 ,self.start_y + y*self.unit+1, chosen["url"], chosen["value"], chosen["density"], None)
