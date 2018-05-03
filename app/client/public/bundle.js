/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/runner.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/helpers/setup.js":
/*!*************************************!*\
  !*** ./client/src/helpers/setup.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Deck = __webpack_require__(/*! ../models/deck.js */ \"./client/src/models/deck.js\")\nconst Player = __webpack_require__(/*! ../models/player.js */ \"./client/src/models/player.js\")\n\nconst SetUpHelper = {}\n\nSetUpHelper.setUpDeck = function (onComplete) {\n  const deck = new Deck();\n  deck.getDeckData(() => {\n    deck.formDeck();\n    deck.shuffleDeck();\n    onComplete(deck);\n  })\n}\n\n\nSetUpHelper.setUpPlayers = function (deck, gameView) {\n  const player1 = new Player(gameView.getPlayerName(1), 1);\n  const player2 = new Player(gameView.getPlayerName(2), 2);\n  const player3 = new Player(gameView.getPlayerName(3), 3);\n  const player4 = new Player(gameView.getPlayerName(4), 4);\n  // player3.aliveStatus = false;\n  // player4.aliveStatus = false;\n\n  player1.card = deck.drawCard();\n  player2.card = deck.drawCard();\n  player3.card = deck.drawCard();\n  player4.card = deck.drawCard();\n  return [player1, player2, player3, player4];\n}\n\n\nmodule.exports = SetUpHelper\n\n\n//# sourceURL=webpack:///./client/src/helpers/setup.js?");

/***/ }),

/***/ "./client/src/models/deck.js":
/*!***********************************!*\
  !*** ./client/src/models/deck.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DeckRequest = __webpack_require__(/*! ../services/request.js */ \"./client/src/services/request.js\");\n\nconst Deck = function() {\n  this.apiDeckInfo = {};\n  this.cardDeck = [];\n  this.counter = 0;\n  this.noCardsLeft = false;\n  this.cardActions = [];\n  this.initialRemovedCard = null;\n\n  const guard = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceGuard(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const priest = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoicePriest(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const baron = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceBaron(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const handmaid = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceHandmaid(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const prince = function (holderPlayer, gameView, playerArray, endOfGoFunctions, deck) {\n    gameView.askForPlayerChoicePrince(holderPlayer, playerArray, endOfGoFunctions, deck);\n  }\n\n  const king = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceKing(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const countess = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoiceCountess(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  const princess = function (holderPlayer, gameView, playerArray, endOfGoFunctions) {\n    gameView.askForPlayerChoicePrincess(holderPlayer, playerArray, endOfGoFunctions);\n  }\n\n  this.cardActions.push(guard);\n  this.cardActions.push(priest);\n  this.cardActions.push(baron);\n  this.cardActions.push(handmaid);\n  this.cardActions.push(prince);\n  this.cardActions.push(king);\n  this.cardActions.push(countess);\n  this.cardActions.push(princess);\n} // end Deck constructor\n\n\nDeck.prototype.getDeckData = function (gotCardData) {\n  const deckRequest = new DeckRequest('http://localhost:3000/data4players');\n\n  const getDataRequestComplete = ((cardData) => {\n    cardData.forEach((card) => {\n      this.apiDeckInfo[card.character] = card;\n    });\n    gotCardData();\n  }) // end getDataRequestComplete callback function\n\n  deckRequest.get(getDataRequestComplete);\n}\n\n\nDeck.prototype.formDeck = function(){\n  for (let i = 1; i < 6; i++){\n    this.cardDeck.push(this.apiDeckInfo.Guard);\n  }\n  for (let i = 1; i < 3; i++){\n    this.cardDeck.push(this.apiDeckInfo.Priest); //priest\n    this.cardDeck.push(this.apiDeckInfo.Baron); // baron\n    this.cardDeck.push(this.apiDeckInfo.Handmaid);\n    this.cardDeck.push(this.apiDeckInfo.Prince);\n  }\n  this.cardDeck.push(this.apiDeckInfo.King);\n  this.cardDeck.push(this.apiDeckInfo.Countess);\n  this.cardDeck.push(this.apiDeckInfo.Princess);\n}\n\n\nDeck.prototype.shuffleDeck = function () {\n  let currentIndex =  this.cardDeck.length;\n  let temporaryValue = 0;\n  let randomIndex = 0;\n  while (0!== currentIndex) {\n    randomIndex = Math.floor(Math.random()*currentIndex);\n    currentIndex -= 1;\n    temporaryValue = this.cardDeck[currentIndex];\n    this.cardDeck[currentIndex] = this.cardDeck[randomIndex];\n    this.cardDeck[randomIndex] = temporaryValue;\n  }\n}\n\n\nDeck.prototype.drawCard = function () {\n  const cardToReturn = this.cardDeck[this.counter]\n  this.counter += 1;\n  if(this.counter === this.cardDeck.length) {\n    this.noCardsLeft = true;\n  }\n  return cardToReturn;\n}\n\n\nDeck.prototype.removeInitialCard = function() {\n  this.initialRemovedCard = this.drawCard();\n}\n\n\nmodule.exports = Deck;\n\n\n//# sourceURL=webpack:///./client/src/models/deck.js?");

/***/ }),

/***/ "./client/src/models/player.js":
/*!*************************************!*\
  !*** ./client/src/models/player.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Player = function(name, playerNumber){\n  this.name = name;\n  this.card = null;\n  this.aliveStatus = true;\n  this.protected = false;\n  this.playerNumber = playerNumber;\n}\n\n\nmodule.exports = Player;\n\n\n//# sourceURL=webpack:///./client/src/models/player.js?");

/***/ }),

/***/ "./client/src/models/turn.js":
/*!***********************************!*\
  !*** ./client/src/models/turn.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Turn = function (activePlayer, gameView, deck, playerArray) {\n  this.secondCard = null;\n  this.activePlayer = activePlayer;\n  this.playerNumber = activePlayer.playerNumber;\n  this.activePlayer.protected = false;\n  this.gameView = gameView;\n  this.deck = deck;\n  this.playerArray = playerArray;\n  this.handCardNotUsed = true;\n  this.deckCardNotUsed = true;\n}\n\n\nTurn.prototype.playerIsActive = function (gameView) {\n  if(this.activePlayer.aliveStatus){\n    const messagebox = document.getElementById(\"message-box\");\n    messagebox.innerHTML = `Your turn ${this.activePlayer.name} </br> Choose the card your wish to play!`;\n    gameView.showHandCard(this.activePlayer);\n    this.handCardNotUsed = true;\n  }\n  return this.activePlayer.aliveStatus;\n}\n\n\nTurn.prototype.getSecondCard = function (deck, gameView) {\n  this.secondCard = deck.drawCard();\n  gameView.showDeckCard(this.activePlayer, this.secondCard);\n  this.deckCardNotUsed = true;\n}\n\n\nTurn.prototype.activateCardChoiceEventListener = function (endOfGoFunctions) {\n  const playerNumber = this.playerNumber;\n  const handCardImage = document.getElementById(`player${playerNumber}-handCardImage`);\n  const deckCardImage = document.getElementById(`player${playerNumber}-deckCardImage`);\n\n  if ((this.secondCard.character === \"King\" || this.secondCard.character === \"Prince\") && this.activePlayer.card.character === \"Countess\") {\n    handCardImage.addEventListener('click', () => { this.handImageHandler(endOfGoFunctions) });\n  }\n  else if ((this.activePlayer.card.character === \"King\" || this.activePlayer.card.character === \"Prince \") && this.secondCard.character === \"Countess\" ) {\n    deckCardImage.addEventListener('click', () => { this.deckImageHandler(endOfGoFunctions) });\n  }\n  else {\n    handCardImage.addEventListener('click', () => {this.handImageHandler(endOfGoFunctions) });\n    deckCardImage.addEventListener('click', () => {this.deckImageHandler(endOfGoFunctions) });\n  }\n}\n\n\nTurn.prototype.handImageHandler = function (endOfGoFunctions) {\n  if (this.handCardNotUsed) {\n    const playedCard = this.activePlayer.card;\n    const cardNumber = playedCard.value;\n    const action = this.deck.cardActions[`${cardNumber}`-1];\n    this.activePlayer.card = this.secondCard;\n    this.secondCard = null;\n    this.handCardNotUsed = false;\n    this.deckCardNotUsed = false;\n    const discardedHandCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-handCardImage`);\n    discardedHandCardImage.src = `./images/${this.activePlayer.card.character}.png`;\n\n    const deckCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-deckCardImage`);\n    deckCardImage.src = `./images/blank.png`;\n\n    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions, this.deck);\n  }\n}\n\n\nTurn.prototype.deckImageHandler = function (endOfGoFunctions) {\n  if (this.deckCardNotUsed) {\n    const playedCard = this.secondCard;\n    const cardNumber = playedCard.value;\n    const action = this.deck.cardActions[`${cardNumber}`-1]\n    this.secondCard = null;\n    this.handCardNotUsed = false;\n    this.deckCardNotUsed = false;\n    const discardedDeckCardImage = document.getElementById(`player${this.activePlayer.playerNumber}-deckCardImage`);\n    discardedDeckCardImage.src = `./images/blank.png`;\n    console.log(\" Playing Player has laid down their deck card:\", playedCard);\n    console.log(\" The player is left with a hand card now of:\", this.activePlayer.card);\n    action(this.activePlayer, this.gameView, this.playerArray, endOfGoFunctions, this.deck);\n  }\n}\n\n\nmodule.exports = Turn;\n\n\n//# sourceURL=webpack:///./client/src/models/turn.js?");

/***/ }),

/***/ "./client/src/runner.js":
/*!******************************!*\
  !*** ./client/src/runner.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SetUpHelper = __webpack_require__(/*! ./helpers/setup.js */ \"./client/src/helpers/setup.js\");\nconst GameView = __webpack_require__(/*! ./views/game_view.js */ \"./client/src/views/game_view.js\");\nconst Player = __webpack_require__(/*! ./models/player.js */ \"./client/src/models/player.js\");\nconst Turn = __webpack_require__(/*! ./models/turn.js */ \"./client/src/models/turn.js\");\n\nlet deck;\nlet gameNotWon = true;\nlet playerArray = [];\nlet gameNotStarted = true;\nlet turnCounter = 0;\nlet skippedPlayer = 0;\nlet playerWon = null;\nconst gameView = new GameView();\n\n\nSetUpHelper.setUpDeck((finishedDeck) => {\n  deck = finishedDeck;\n  deck.removeInitialCard();\n});\n\n\nconst handleStartGameButton = function () {\n  if (gameNotStarted) {\n    playerArray =  SetUpHelper.setUpPlayers(deck, gameView);\n    const startNoise = new Audio('./sounds/startPlaying.mp3')\n    startNoise.play();\n    playRound();\n    gameNotStarted = false;\n    const startButton = document.getElementById('start-button');\n    startButton.style.background = \"rgb(158, 147, 130)\";\n    startButton.style.color = \"#614d4d\";\n  }\n}\n\n\nconst handleGoEndButtonClick = function (event) {\n  if (event) {\n    gameView.unShowCards(playerArray);\n    const goEndButton = document.getElementById(`${event.srcElement.id}`)\n    goEndButton.disabled = true;\n    goEndButton.style.background = \"rgb(158, 147, 130)\";\n  }\n\n  if (!gameNotWon) { // message here is done in turn logic now\n  } else if (deck.noCardsLeft) {\n    const numActivePlayersArray = playerArray.filter(player => player.aliveStatus);\n    const numActivePlayers = numActivePlayersArray.length;\n    const messagebox = document.getElementById('message-box');\n    if(numActivePlayers === 1) {\n      messagebox.innerHTML = `Congratulations ${numActivePlayersArray[0].name}!!!! </br> You WON!🎉 Everyone else is dead`\n      gameView.showHandCard(numActivePlayersArray[0]);\n      const wonNoise = new Audio('./sounds/won.mp3')\n      wonNoise.play();\n    } else {\n      let highestCardPlayer = numActivePlayersArray[0];\n      let draw = false;\n      for(i = 1; i < numActivePlayers; i++){\n        if(highestCardPlayer.card.value < numActivePlayersArray[i].card.value){\n          highestCardPlayer = numActivePlayersArray[i];\n          draw = false;\n        }\n        else if (highestCardPlayer.card.value === numActivePlayersArray[i].card.value) {\n          draw = true;\n        }\n      }\n      if (draw) {\n        messagebox.innerHTML = `No cards left in the deck</br> But it was a draw... NO ONE THINKS THIS WILL EVER HAPPEN!! Unicorns exist`;\n        const youDrewNoise = new Audio('./sounds/draw.mp3');\n        for (const player of numActivePlayersArray) {\n          gameView.showHandCard(player);\n        }\n        youDrawNoise.play();\n      } else {\n        messagebox.innerHTML = `No cards left in the deck</br> Congratulations ${highestCardPlayer.name}!!!! You WON!🎉 with a ${highestCardPlayer.card.character}`\n        for (const player of numActivePlayersArray) {\n          gameView.showHandCard(player);\n        }\n        const wonNoise = new Audio('./sounds/won.mp3')\n        wonNoise.play();\n      }\n    } // end of else\n\n  } else { // Game Still going, play next persons GO!\n    if (turnCounter < 3) {\n      turnCounter += 1;\n    } else {\n      turnCounter = 0\n    };\n    setTimeout(playRound, 2500)\n  };\n} // end end-go-button click\n\n\n\nconst playRound = function () {\n  console.log(\"Round:\", turnCounter,\" kicked off!\");\n  const turnLogic = new Turn(playerArray[turnCounter], gameView, deck, playerArray);\n\n  const numActivePlayersArray = playerArray.filter(player => player.aliveStatus);\n  const numActivePlayers = numActivePlayersArray.length;\n\n  if (numActivePlayers < 2) {\n    gameNotWon = false;\n    const messagebox = document.getElementById('message-box');\n    messagebox.innerHTML = `Congratulations ${numActivePlayersArray[0].name}!!!! </br> 🎉 You WON!!!! Everyone else is dead`\n    handleGoEndButtonClick();\n    gameView.showHandCard(numActivePlayersArray[0]);\n    const wonNoise = new Audio('./sounds/won.mp3')\n    wonNoise.play();\n  } else if (turnLogic.playerIsActive(gameView)) {\n    turnLogic.getSecondCard(deck, gameView);\n    const endOfGo = function () {\n      const goEndButton = document.getElementById('end-go-button');\n      goEndButton.style.background = \"rgb(138, 218, 105)\";\n      goEndButton.disabled = false;\n    }\n    turnLogic.activateCardChoiceEventListener(endOfGo);\n    skippedPlayer = 0;\n  } else { // auto SKIP PLAYER AS THEY are dead\n    handleGoEndButtonClick();\n  };\n} // end Round\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  const startButton = document.getElementById('start-button');\n  startButton.addEventListener('click', handleStartGameButton)\n\n  const goEndButton = document.getElementById('end-go-button');\n  goEndButton.addEventListener('click', (event) => {handleGoEndButtonClick(event)});\n  goEndButton.disabled = true;\n});\n\n\n//# sourceURL=webpack:///./client/src/runner.js?");

/***/ }),

/***/ "./client/src/services/request.js":
/*!****************************************!*\
  !*** ./client/src/services/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n}\n\nRequest.prototype.get = function(onApiRequestComplete) {\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n  request.addEventListener('load', function () {\n    if(this.status !== 200) {\n      return;\n    }\n    const responseBody = JSON.parse(this.responseText);\n    onApiRequestComplete(responseBody);\n  });\n  request.send();\n}\n\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/services/request.js?");

/***/ }),

/***/ "./client/src/views/game_view.js":
/*!***************************************!*\
  !*** ./client/src/views/game_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const GameView = function () {\n  this.numDiscardedCards = 0;\n}\n\nconst characterMessages = {\n  Guard: \"ACTION: Choose a player and guess their card\",\n  Priest: \"ACTION: Choose a player whose card you wish to see\",\n  Baron: \"ACTION: Choose a player you wish to compare hands with\",\n  Handmaid: \"You are protected from other card actions until your next go\",\n  Prince: \"ACTION: Choose a player to discard their card\",\n  King: \"ACTION: Choose a player you wish to swap cards with\",\n  Countess: \"\",\n  Princess: \"You are now out of the game!\"\n}\n\nGameView.prototype.getPlayerName = function (playerNumber) {\n  const playerNameInput = document.getElementById(`player${playerNumber}-inputName`); //input html box where users can type name\n  const playerName = playerNameInput.value;\n  const playerNameBox = document.getElementById(`player${playerNumber}-nameBox`) // div that previously contained an input\n  playerNameBox.innerHTML = `<h1>${playerName}</h1>`; // change input to title using the name inputted.\n  return playerName;\n}\n\nGameView.prototype.renderLayout = function (arrayOfPlayers) {\n  // set up the space for cards\n  for (i = 1; i <5; i++) {\n    const playerHandCardImage = document.getElementById(`player${i}-handCardImage`);\n    playerHandCardImage.src = url(\"./client/public/images/lovelettercard.png\")\n  }\n}\n\nGameView.prototype.showHandCard = function (player) {\n  // Get player number from player then fill container for that player\n  console.log(\"showing hand card of player:\", player.playerNumber);\n  const imageName = player.card.character;\n  setImage(player, \"hand\", imageName);\n}\n\nGameView.prototype.showDeckCard = function (player, secondCard) {\n  console.log(\"showing deck cards of player:\", player.playerNumber);\n  const imageName = secondCard.character;\n  setImage(player, \"deck\", imageName);\n}\n\nGameView.prototype.unShowCards = function (playerArray) {\n  // Get player number from player then fill container for that player\n  for (const player of playerArray) {\n    if (player.aliveStatus) {\n      setImage(player, \"hand\", \"lovelettercard\");\n    } else {\n      setImage(player,\"hand\", \"dead\");\n    }\n    setImage(player, \"deck\",\"blank\");\n  }\n}\n\nGameView.prototype.addToDiscard = function (cardName) {\n  const pile = document.getElementById('discard-pile-container');\n  const discardedCard = document.createElement('img');\n  discardedCard.src = `./images/${cardName}.png`;\n  console.log(\"number of cards in discard pile: \", this.numDiscardedCards);\n  discardedCard.classList = \"discarded-card\";\n  if (!(this.numDiscardedCards === 0)) {\n    const yShift = (this.numDiscardedCards * 280 * (-1));\n    console.log(yShift);\n    discardedCard.style.transform = `translateY(${yShift}px)`;\n    console.log(discardedCard.style);\n  }\n  pile.appendChild(discardedCard);\n\n  this.numDiscardedCards += 1;\n}\n\nGameView.prototype.askForPlayerChoicePrincess = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"princess\");\n  this.addToDiscard(`${holderPlayer.card.character}`);\n  setTextInMessageBoxUponCardClick(\"Princess\");\n  holderPlayer.aliveStatus = false;\n  this.unShowCards(playerArray);\n  endOfGoFunctions();\n}\n\n\nGameView.prototype.askForPlayerChoiceCountess = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"countess\");\n  setTextInMessageBoxUponCardClick(\"Countess\");\n  endOfGoFunctions();\n}\n\n\nGameView.prototype.askForPlayerChoiceKing = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"king\");\n  let activePlayersNonProtected = [];\n  for (const player of playerArray){\n    if (!player.protected  && player.aliveStatus ) {\n      activePlayersNonProtected.push(player);\n    }\n  }\n  if (activePlayersNonProtected.length === 1)  {\n    setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n    endOfGoFunctions();\n  } else {\n    setTextInMessageBoxUponCardClick(\"King\");\n    const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false, endOfGoFunctions);\n    submitChoice = setUpSubmitButton();\n\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayer = getChosenPlayer(playerChoiceSelector, playerArray);\n      setBespokeTextInMessageBox(`You choose to swap cards with ${chosenPlayer.name} </br>Your new card is ${chosenPlayer.card.character}`);\n      removeOptionsAfterTurn(playerChoiceSelector, submitChoice);\n\n      const holderPlayerCard = holderPlayer.card;\n      const chosenPlayerCard = chosenPlayer.card;\n      holderPlayer.card = chosenPlayerCard;\n      chosenPlayer.card = holderPlayerCard;\n\n      const chosenPlayerNewCardImageName = chosenPlayer.card.character;\n      setImage(chosenPlayer, \"hand\", chosenPlayerNewCardImageName);\n      const holderPlayerNewCardImageName = holderPlayer.card.character\n      setImage(holderPlayer, \"hand\", holderPlayerNewCardImageName);\n      setImage(holderPlayer,\"deck\",\"blank\");\n      endOfGoFunctions();\n    });\n  }\n}\n\n\nGameView.prototype.askForPlayerChoicePrince = function (holderPlayer, playerArray, endOfGoFunctions, deck) {\n  this.addToDiscard(\"prince\");\n  let activePlayersNonProtected = [];\n  for (const player of playerArray){\n    if (!player.protected && player.aliveStatus) {\n      activePlayersNonProtected.push(player);\n    }\n  }\n  if (activePlayersNonProtected.length === 1)  {\n    setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n    endOfGoFunctions();\n  } else {\n    setTextInMessageBoxUponCardClick(\"Prince\");\n    const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, true, endOfGoFunctions);\n    submitChoice = setUpSubmitButton();\n\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayer = getChosenPlayer(playerChoiceSelector, playerArray);\n      setBespokeTextInMessageBox(`You chose to make ${chosenPlayer.name} discard their card`);\n      removeOptionsAfterTurn(playerChoiceSelector, submitChoice);\n      this.addToDiscard(`${chosenPlayer.card.character.toLowerCase()}`);\n      if (chosenPlayer.card.character === \"Princess\") {\n        chosenPlayer.aliveStatus = false;\n        setBespokeTextInMessageBox(`You chose to make ${chosenPlayer.name} discard their card </br> They had the Princess so they are now dead!`);\n      } else {\n        if(!deck.noCardsLeft){\n          chosenPlayer.card = deck.drawCard();\n        } else {\n          chosenPlayer.card = deck.initialRemovedCard;\n        }\n        const imageName = holderPlayer.card.character;\n        setImage(holderPlayer,\"hand\", imageName);\n      } // end else\n      endOfGoFunctions();\n    }); // end event listener\n  }\n}\n\n\nGameView.prototype.askForPlayerChoiceHandmaid = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"handmaid\");\n  setTextInMessageBoxUponCardClick(\"Handmaid\");\n  holderPlayer.protected = true;\n  endOfGoFunctions();\n}\n\n\nGameView.prototype.askForPlayerChoiceBaron = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"baron\");\n  let activePlayersNonProtected = [];\n  for (const player of playerArray){\n    if (!player.protected && player.aliveStatus) {\n      activePlayersNonProtected.push(player);\n    }\n  }\n  if (activePlayersNonProtected.length === 1) {\n    setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n    endOfGoFunctions();\n  } else {\n  setTextInMessageBoxUponCardClick(\"Baron\");\n  const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false, endOfGoFunctions);\n  submitChoice = setUpSubmitButton();\n  submitChoice.addEventListener('click', () => {\n    const chosenPlayer = getChosenPlayer(playerChoiceSelector, playerArray);\n    // Note: line below never appears as too quick\n    setBespokeTextInMessageBox(`You chose to compare cards with ${chosenPlayer.name}</br>Their card is ${chosenPlayer.card.character}`);\n    removeOptionsAfterTurn(playerChoiceSelector, submitChoice);\n    this.showHandCard(chosenPlayer);\n    if(chosenPlayer.card.value < holderPlayer.card.value) {\n      chosenPlayer.aliveStatus = false;\n      setBespokeTextInMessageBox(`Your card is higher than ${chosenPlayer.name}'s ${chosenPlayer.card.character} - ${chosenPlayer.name} dies!`);\n\n      const imageName = chosenPlayer.card.character;\n      this.addToDiscard(chosenPlayer.card.character);\n      setImage(chosenPlayer,\"hand\",\"blank\");\n    } else if (chosenPlayer.card.value > holderPlayer.card.value) {\n      holderPlayer.aliveStatus = false;\n      setBespokeTextInMessageBox(`Your card is lower than ${chosenPlayer.name}'s ${chosenPlayer.card.character} - you die!`);\n\n      const imageName = holderPlayer.card.character;\n      this.addToDiscard(holderPlayer.card.character);\n      setImage(holderPlayer,\"hand\",\"blank\");\n    } else {\n      setBespokeTextInMessageBox(`You both have the same valued card - no one dies`);\n    }\n    endOfGoFunctions();\n  });\n}\n}\n\n\nGameView.prototype.askForPlayerChoicePriest = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"priest\");\n  let activePlayersNonProtected = [];\n  for (const player of playerArray){\n    if (!player.protected && player.aliveStatus) {\n      activePlayersNonProtected.push(player);\n    }\n  }\n  if (activePlayersNonProtected.length === 1)  {\n    setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n    endOfGoFunctions();\n  } else {\n    setTextInMessageBoxUponCardClick(\"Priest\");\n    const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false, endOfGoFunctions);\n    submitChoice = setUpSubmitButton();\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayer = getChosenPlayer(playerChoiceSelector, playerArray);\n      setBespokeTextInMessageBox(`You choose to see card of \"${chosenPlayer.name}\" </br>Their card is ${chosenPlayer.card.character}`)\n      removeOptionsAfterTurn(playerChoiceSelector, submitChoice);\n      this.showHandCard(chosenPlayer);\n      endOfGoFunctions();\n    });\n  }\n}\n\n\nGameView.prototype.askForPlayerChoiceGuard = function (holderPlayer, playerArray, endOfGoFunctions) {\n  this.addToDiscard(\"guard\");\n  let activePlayersNonProtected = [];\n  for (const player of playerArray){\n    if (!player.protected && player.aliveStatus) {\n      activePlayersNonProtected.push(player);\n    }\n  }\n  if (activePlayersNonProtected.length === 1) {\n    setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n    endOfGoFunctions();\n  }\n  else {\n    setTextInMessageBoxUponCardClick(\"Guard\");\n    const playerChoiceSelector = setUpPlayerDropDown(holderPlayer, playerArray, false, endOfGoFunctions);\n    const cardChoiceSelector = setUpCardDropDown()\n    submitChoice = setUpSubmitButton();\n    submitChoice.addEventListener('click', () => {\n      const chosenPlayer = getChosenPlayer(playerChoiceSelector, playerArray);\n      if (chosenPlayer.card.character === cardChoiceSelector.value){\n        chosenPlayer.aliveStatus = false;\n        setBespokeTextInMessageBox(`Correct! You guessed ${chosenPlayer.name} had a ${cardChoiceSelector.value},</br>${chosenPlayer.name} is out of the game!`);\n        this.addToDiscard(`${chosenPlayer.card.character}`);\n      } else {\n        setBespokeTextInMessageBox(`Wrong! ${chosenPlayer.name} does not have a ${cardChoiceSelector.value}`);\n      }\n      removeOptionsAfterTurn(playerChoiceSelector, submitChoice, cardChoiceSelector);\n      endOfGoFunctions();\n    });\n  }\n}\n\n\n\n// START OF HELPER FUNCTIONS\n// (Think these could be refactored further)\n\nconst setImage = function(player, handOrDeck, imageName) {\n  const playerNumber = player.playerNumber;\n  const image = document.getElementById(`player${playerNumber}-${handOrDeck}CardImage`);\n  image.src = `./images/${imageName}.png`\n}\n\n\nconst setTextInMessageBoxUponCardClick = function(character) {\n  const messagebox = document.getElementById(\"message-box\");\n  messagebox.innerHTML = `You played the ${character} card </br> ${characterMessages[character]}`\n}\n\n\nconst setBespokeTextInMessageBox = function(text) {\n  const messagebox = document.getElementById(\"message-box\");\n  messagebox.innerHTML = text;\n}\n\n\nconst setUpPlayerDropDown = function(holderPlayer, playerArray, isAPrince, endOfGoFunctions) {\n  const playerChoiceSelector = document.createElement('select');\n  playerChoiceSelector.classList = \"control-item\";\n  playerChoiceSelector.id = \"player-select\";\n  let playerOptions = [];\n  if(isAPrince) {\n    for (const player of playerArray){\n      if(player.aliveStatus && !player.protected) {\n        playerOptions.push(player);\n      } else { }\n    }\n    for (const player of playerOptions) {\n      const option = document.createElement('option');\n      option.classList = \"control-item\";\n      option.textContent = player.name;\n      option.value = JSON.stringify(player);\n      playerChoiceSelector.appendChild(option);\n    }\n    const controlBox = document.getElementById('controls');\n    controlBox.appendChild(playerChoiceSelector);\n  } else {\n    for (const player of playerArray){\n      if(player !== holderPlayer && player.aliveStatus && !player.protected) {\n        playerOptions.push(player);\n      } else { }\n    }\n    if (playerOptions.length === 0) {\n      setBespokeTextInMessageBox(`You can't choose anyother players </br> All other players are either protected by the Handmaid or no longer active this round`);\n\n      endOfGoFunctions();\n    }\n    else {\n      for (const player of playerOptions) {\n        const option = document.createElement('option');\n        option.classList = \"control-item\";\n        option.textContent = player.name;\n        option.value = JSON.stringify(player);\n        playerChoiceSelector.appendChild(option);\n      }\n      const controlBox = document.getElementById('controls');\n      controlBox.appendChild(playerChoiceSelector);\n    }\n  }\n  return playerChoiceSelector;\n}\n\n\nconst setUpCardDropDown = function() {\n  const cardChoiceSelector = document.createElement('select');\n  cardChoiceSelector.classList = \"control-item\";\n  cardChoiceSelector.id = \"card-select\";\n  for (let i = 2; i < 9; i++) {\n    const optionCharacter = document.createElement('option');\n    switch (i){\n      case 2:\n      optionCharacter.textContent = 'Priest';\n      optionCharacter.value = 'Priest';\n      break;\n      case 3:\n      optionCharacter.textContent = 'Baron';\n      optionCharacter.value = 'Baron';\n      break;\n      case 4:\n      optionCharacter.textContent = 'Handmaid';\n      optionCharacter.value = 'Handmaid';\n      break;\n      case 5:\n      optionCharacter.textContent = 'Prince';\n      optionCharacter.value = 'Prince';\n      break;\n      case 6:\n      optionCharacter.textContent = 'King';\n      optionCharacter.value = 'King';\n      break;\n      case 7:\n      optionCharacter.textContent = 'Countess';\n      optionCharacter.value = 'Countess';\n      break;\n      case 8:\n      optionCharacter.textContent = 'Princess';\n      optionCharacter.value = 'Princess';\n      break;\n    }\n    cardChoiceSelector.appendChild(optionCharacter);\n  }\n  const controlBox = document.getElementById('controls');\n  controlBox.appendChild(cardChoiceSelector);\n  return cardChoiceSelector;\n}\n\n\nconst setUpSubmitButton = function() {\n  const submitChoice = document.createElement('button');\n  submitChoice.classList = \"control-item\";\n  submitChoice.id = \"player-submit-button\";\n  submitChoice.textContent = \"Submit Player Choice!\"\n  const controlBox = document.getElementById('controls');\n  controlBox.appendChild(submitChoice);\n  return submitChoice;\n}\n\n\nconst removeOptionsAfterTurn = function(playerChoiceSelector,submitChoice,  cardChoiceSelector) {\n  const controlBox = document.getElementById('controls');\n  controlBox.removeChild(playerChoiceSelector);\n  controlBox.removeChild(submitChoice);\n  if(cardChoiceSelector) {\n    controlBox.removeChild(cardChoiceSelector);\n  }\n}\n\n\nconst getChosenPlayer = function(playerChoiceSelector, playerArray) {\n  const chosenPlayerNumber =  JSON.parse(playerChoiceSelector.value).playerNumber;\n  const chosenPlayer = playerArray[chosenPlayerNumber -1];\n  return chosenPlayer;\n}\n\n// END OF HELPER FUNCTIONS\n\n\nmodule.exports = GameView;\n\n\n//# sourceURL=webpack:///./client/src/views/game_view.js?");

/***/ })

/******/ });