(function (document) {
    "use strict";

    var cards = document.querySelectorAll('.memory-card'),
        hasFlippedCard = false,
        lockBoard = false,
        firstCard,
        secondCard;


    function checkForMatch() {
        if (firstCard.dataset.type === secondCard.dataset.type) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function flipCard() {
        if (lockBoard) {
            return;
        }

        if (this === firstCard) {
            return;
        }
        this.classList.add('flip');

        if (!hasFlippedCard) {
            //First click
            hasFlippedCard = true;
            firstCard = this;

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
        setTimeout(function () {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            lockBoard = false;
        },  1500);
    }

    (function shuffle() {
        cards.forEach( card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
      });
    })();

    cards.forEach(card => card.addEventListener('click', flipCard));

})(document);
