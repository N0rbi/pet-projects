from gameObject.staticGameObject import StaticGameObject


class DynamicGameObject(StaticGameObject):

    def __init__(self, x, y, imgPath, directionMtx):
        StaticGameObject.__init__(x, y, imgPath)
        self._direcition = directionMtx

    def _updatePosition(self, deltatime):
        '''
        update (x,y) according to time difference with delta and direction matrix
        '''
        pass

    def tick(self, deltatime):
        self._updatePosition(deltatime)
