from game import Game
# Main handles file loading (possible network managing), and the configuration of the game (images, sounds)


def getObeservers():
    from observers.gameQuitObserver import GameQuitObserver
    observers = []
    observers.append(GameQuitObserver())
    return observers


def getResponders():
    from responders.gameQuitResponder import GameQuitResponder
    responders = []
    responders.append(GameQuitResponder())
    return responders

game = Game(300,600)
game.observers = getObeservers()
game.responders = getResponders()

for gameStatus in game.tick():
    pass
