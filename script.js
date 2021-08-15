'use strict';
//Selecting Elements
let player0EL = document.querySelector('.player--0');
let player1EL = document.querySelector('.player--1');
let score0EL = document.querySelector('#score--0');
let score1EL = document.getElementById('score--1');
let currentScore0EL = document.getElementById('current--0');
let currentScore1EL = document.getElementById('current--1');
let diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions
let scores, playing, currentScore, activePlayer;
//Intialization function
let init = function(){
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;
    currentScore0EL.textContent = 0;
    currentScore1EL.textContent = 0;

    diceEL.classList.add('hidden');
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
}
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling Dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        //Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        //Displaying the dice roll
        diceEL.classList.remove('hidden');
        diceEL.src = `dice-${dice}.png`;

        //Check for if dice rolled 1
        if(dice !== 1){
            //Add dice value to the current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            //Switch the player
            switchPlayer();
        }
    }
})


// Holding the scores
btnHold.addEventListener('click', function(){
    if(playing){
        //Add current score to active players score
        scores[activePlayer] += currentScore; 
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        console.log(scores[activePlayer]);
        //Check if players score >= 100
        if(scores[activePlayer] >= 10){
            // Finish the game
            playing = false;
            diceEL.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        }
        else{
            //switch to the next player
            switchPlayer();
        }
    }
})

//Resetting the game
btnNew.addEventListener('click', init);