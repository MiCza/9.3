'use strict';

var params = {
  playerScore: 0,
  computerScore: 0,
  round: 0,
  numberRounds: 0,
  progress: [],
};

var playerScoreEl = document.querySelector('.playerScoreCounter');
var computerScoreEl = document.querySelector('.computerScoreCounter');
var scoreBoardEl = document.querySelector('.scoreBoard');
var btnNewGame = document.querySelector('#newGame');
var output = document.querySelector('#output > p');
var rock = document.querySelector('#rock');
var paper = document.querySelector('#paper');
var scissors = document.querySelector('#scissors');
var popup = document.querySelector('.popup > div');
var playerScoreElement = document.querySelector('.jsScorePlayer');
var computerScoreElement = document.querySelector('.jsScoreComputer');
var roundsList = document.querySelector('.jsRoundsList');

function getComputerChoice() {
  var choices = ['rock', 'paper', 'scissors'];
  var randomNumber = Math.floor(Math.random() * 3);
  return choices [randomNumber];
}

var newGame = function () {
  endGame();
  params.numberRounds = window.prompt('How many rounds would you like to play?', 'number');
  if (!params.numberRounds || isNaN(params.numberRounds) || params.numberRounds == '' || params.numberRounds == null) {
    output.innerHTML = 'Incorrect number. Please try again';
  } else {
    roundsNumber.innerHTML = params.numberRounds;
    enabledButtons();
    return params.numberRounds;
  }
};

var endGame = function () {
  params.playerScore = 0;
  params.computerScore = 0;
  params.round = 0;
  params.numberRounds = 0;
  output.innerHTML = ('');
  roundsNumber.innerHTML = ('');
};

function showPopup() {
  playerScoreElement.innerHTML = params.playerScore;
  computerScoreElement.innerHTML = params.computerScore;
  popup.className = 'show';
}

function win(playerChoice, computerChoice) {
  params.playerScore++;
  playerScoreEl.innerHTML = params.playerScore + ' ';
  computerScoreEl.innerHTML = ' ' + params.computerScore;
  output.innerHTML = playerChoice + ' beats ' + computerChoice + '. You win!';
}

function lost(playerChoice, computerChoice) {
  params.computerScore++;
  computerScoreEl.innerHTML = ' ' + params.computerScore;
  playerScoreEl.innerHTML = params.playerScore + ' ';
  output.innerHTML = computerChoice + ' beats ' + playerChoice + '. You lost!';
}

function draw(playerChoice, computerChoice) {
  output.innerHTML = playerChoice + ' equals ' + computerChoice + '. It\'s a draw.';
}

function playerMove(playerChoice) {
  var li = document.createElement('li');
  params.round++;
  var computerChoice = getComputerChoice();
  switch (playerChoice + computerChoice) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      win(playerChoice, computerChoice);
      li.innerHTML = 'Round: ' + params.round + ' - You won.';
      break;
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      lost(playerChoice, computerChoice);
      li.innerHTML = 'Round: ' + params.round + ' - You lost.';
      break;
    case 'rockrock':
    case 'paperpaper':
    case 'scissorsscissors':
      draw(playerChoice, computerChoice);
      li.innerHTML = 'Round: ' + params.round + ' - It was a draw';
      break;
  }
  roundsList.appendChild(li);
}

var disabledButtons = function () {
  paper.disabled = true;
  rock.disabled = true;
  scissors.disabled = true;
};

var enabledButtons = function () {
  paper.disabled = false;
  rock.disabled = false;
  scissors.disabled = false;
};

function main() {
  rock.addEventListener('click', function () {
    playerMove('rock');
    checkRounds();
  });

  paper.addEventListener('click', function () {
    playerMove('paper');
    checkRounds();
  });

  scissors.addEventListener('click', function () {
    playerMove('scissors');
    checkRounds();
  });

  btnNewGame.addEventListener('click', function () {
    disabledButtons();
    newGame();
  });

  params.progress.push({
      gameRounds: params.round,
      gamePlayerMove: attribute,
      gameComputerMove: getComputerChoice(),
      finalResult: params.playerScore + ' - ' + params.computerScore,
    });
}

var checkRounds = function () {
  if (params.round == params.numberRounds) {
    if (params.computerScore > params.playerScore) {
      output.innerHTML = 'YOU LOST A WHOLE GAME!';
      showPopup();
    } else if (params.computerScore === params.playerScore) {
      output.innerHTML = 'FINALLY IT IS A DRAW!';
      showPopup();
    } else {
      output.innerHTML = 'YOU WON A WHOLE GAME!';
      showPopup();
    }

    disabledButtons();
  }
};

disabledButtons();
main();
output.innerHTML = 'Click "New Game" to start.';
