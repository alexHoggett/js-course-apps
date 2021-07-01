'use strict';

// DOM manipulation

// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = "gimme love";
// console.log(document.querySelector('.message').textContent);

// console.log(document.querySelector('.guess').value);
// document.querySelector('.guess').value = 23;

// click events

let secretNumber = Math.trunc(Math.random() * 20);
let score = 20;
let highScore = 0;
let won = false;

document.querySelector('.score').textContent = score;

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value);

    // check that guess has a value assigned to it
    if (!guess) {
        document.querySelector('.message').textContent = 'No Number!';
    } 
    // guess is correct
    else if (guess == secretNumber){
        won = true;
        document.querySelector('.message').textContent = 'Correct Number! 🎉';

        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem';

        document.querySelector('.number').textContent = secretNumber;

    // guess is incorrect
    } else if (guess != secretNumber){
        if (score > 1){
            document.querySelector('.message').textContent = guess > secretNumber ? 'Too High' : 'Too Low';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = 'You Lost!';
            document.querySelector('.score').textContent ='0';
        }
    }
    document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', function() {
    // hide number
    document.querySelector('.number').textContent = '?';

    // create new secret number
    secretNumber = Math.trunc(Math.random() * 20);

    // reset guess number
    document.querySelector('.guess').value = '';

    // reset text message
    document.querySelector('.message').textContent = 'Start guessing...';

    if (won){
        won = false;

        // set highscore
        if (score > highScore){
            highScore = score;
        }

        document.querySelector('.highscore').textContent = highScore;

        // reset styles color
        document.querySelector('body').style.backgroundColor = '#222'

        document.querySelector('.number').style.width = '15rem';
    }

    score = 20
    document.querySelector('.score').textContent = score;
});