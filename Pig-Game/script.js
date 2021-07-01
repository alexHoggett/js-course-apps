'use strict';

// selecting elements
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores;
let currentScore;
let currentPlayer;
let playing;

const init = function() {
    scores = [0, 0];
    currentScore = 0;
    currentPlayer = 0;
    playing = true;
    
    playing = true
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    currentPlayer = 0;
    
    dice.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();

function switchPlayers(){
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
        currentScore = 0;
        currentPlayer = 1 - currentPlayer;
        // switch to next player
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if (playing){
        // generate a random dice roll
        const diceRoll = Math.trunc(1 + (Math.random()) * 6);

        // display the dice
        dice.classList.remove('hidden');
        dice.src = `dice-${diceRoll}.png`;

        //check for a rolled one, if true then switch player
        if(diceRoll !== 1){
            currentScore += diceRoll;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else {
            switchPlayers();
        }
    }
});

btnHold.addEventListener('click', function() {
    if (playing){
        // add current score to global score
        scores[currentPlayer] += currentScore;

        // update the score text
        currentPlayer == 0 ? score0El.textContent = scores[currentPlayer] : score1El.textContent = scores[currentPlayer];

        if (currentScore >= 100){
            // player won
            playing = false;
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
            dice.classList.add('hidden');
        } else {
            switchPlayers();
        }
    }
});

btnNew.addEventListener('click', function(){
    playing = true
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    currentPlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
});



