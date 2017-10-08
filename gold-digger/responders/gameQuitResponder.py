from responders.responder import Responder
import observers.observationConstants as const
import sys


class GameQuitResponder(Responder):

    def respond(self, observations):
        if const.GAME_QUIT in observations:
            sys.exit()
