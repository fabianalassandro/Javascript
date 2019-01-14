(function (document) {
    "use strict"; // Good practice to set the js file.

    var cards = document.querySelectorAll('.memory-card'),
    // The one above is a list of all memory-card elements that I'm storing inside a constant named "cards"

        hasFlippedCard = false, // declaring that the default is false
        lockBoard = false, // declaring the variable to lock the board after the first pair of cards.
        firstCard,
        secondCard; // declarig first and second card, because we need to differentiate them.
// When I declare more than one var I can use var one time and then declare the following ones, just by adding a comma at the end of the statement.


    function checkForMatch() { //use in the flipCard function
        //Cards match - using data attribute in HTML
        if (firstCard.dataset.type === secondCard.dataset.type) {
            //dataset.type: to access to the data attribute that I called type in the HTML
            disableCards();
        } else {
            unflipCards();
        }
    }

    function flipCard() {
        if (lockBoard) {
            return;
        } // lock the board after the first pair of cards have been flipped

        // console.log('I was clicked!');// I used this at the beginnig to check if the logic was working.
        // console.log(this); // This shows where the action is made in the DOM. In this case: <div class="memory-card">

        if (this === firstCard) {
            return; // to disallow double click on the same card. Beca
        }
        this.classList.add('flip'); //Here I'm accessing to the class list of memory card and add the flip class. It means: if the class is there remove it, if it's not add it. If I check this on the console of the browser I'll see that the class "toggle" is added or remove it every time I click on the card.

        if (!hasFlippedCard) {
            //First click
            hasFlippedCard = true;
            firstCard = this; // "this" is the memory card. "this" is the element that fires the event.
            // return;

        } else {
            //Second click
            hasFlippedCard = false;
            secondCard = this;

            checkForMatch();
        }
    }

    function disableCards() {
        // It's a match!
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }

    function unflipCards() {
        lockBoard = true;
        //It's not a match
        setTimeout(function () { // to give 15'' of time before to flip again the cards
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockBoard = false; // to unlock the board after cards have been flipped.
        },  1500);
    }

    //Above is where the flipCard function is declared. Below is where the function is called.

    (function shuffle() {
        cards.forEach( card => {
            let randomPos = Math.floor(Math.random() * 12); //Math.floor is to get an integer number
            card.style.order = randomPos;
      });
    })(); // Function to create the shuffle effect on the cards. To trigger this function as soon as we refresh the page we need to wrap it between parenthesis.

    cards.forEach(card => card.addEventListener('click', flipCard));
    // Here I'm looping trough a list - of cards in this case. I'm using cards (defined above) to assign for each card an event listener. An event listener is  a way to say: stay there and wait until something happens. In this case what is happening is a click event. So this is what I'm saying: card if you receive a click do the flipCard function

    var start = document.getElementById('startButton');// I don't need the # to get the id. I need it in jQuery

    function startGame() {
        // console.log('Clicked')
        var startTime = new Date(),
            endTime = new Date(),
            seconds = (endTime - startTime) / 1000
        console.log()    
    }

    start.addEventListener('click', startGame);

})(document); // () this is to call the function
