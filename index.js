const defaultCardArray = ["img/blue.jpg","img/blue.jpg","img/red.jpg",
    "img/red.jpg","img/yellow.png","img/yellow.png", "img/green.jpg", "img/green.jpg", "img/pink.jpg","img/pink.jpg",
    "img/grey.png", "img/grey.png","img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg"
];
const defaultCardArray6x6 = [
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
];

const defaultCardArray8x8 = [
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png",
    "img/orange.jpg", "img/orange.jpg", "img/purple.jpg", "img/purple.jpg",
    "img/blue.jpg","img/blue.jpg","img/red.jpg","img/red.jpg",
    "img/yellow.png","img/yellow.png","img/green.jpg", "img/green.jpg",
    "img/pink.jpg","img/pink.jpg","img/grey.png", "img/grey.png"
];
let mixedCardArray = [];
let flippedCards = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


const getRadioValue = () => {
    const radioBtns = document.getElementsByName("difficulty");
    let result;
    radioBtns.forEach(radio => {
        if (radio.checked) {
            result = radio.value;
        }
    });
     return parseInt(result);
 };

const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
    return cards;
};

const flipCard = (e) =>  {
    if (lockBoard) return;
    const card = e.currentTarget;
    card.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = card;
        return;
    }
    secondCard = card;
    hasFlippedCard = false;
    checkForMatch();
};

// let second = 0, minute = 0;
// let interval;
// const timer = document.querySelector(".timer");

// const startTimer = () => {
//     interval = setInterval(function(){
//         timer.innerHTML = minute+ "mins " + second+ "secs";
//         second++;
//         if(second === 60){
//             minute++;
//             second = 0;
//         }
//         if(minute === 60){
//             minute = 0;
//         }
//     },1000);
// };

 const checkForMatch = () => {
    if (firstCard.value === secondCard.value) {
        removeFlipCards();
    }
    unFlippedCards();
};

const unFlippedCards = () => {
    lockBoard = true;
    setTimeout(() => {
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
     }, 1500);
};

const resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

const removeFlipCards = () => {
    firstCard.style.cssText = "visibility:hidden;opacity:0;transition:visibility 0s 2s,opacity 2s linear;";
    secondCard.style.cssText = "visibility:hidden;opacity:0;transition:visibility 0s 2s,opacity 2s linear;";
};

const createBoard = () => {
    mixedCardArray = [];
    if (getRadioValue() === 6) {
        mixedCardArray = shuffleCards(defaultCardArray6x6);
    } else if (getRadioValue() === 4) {
        mixedCardArray = shuffleCards(defaultCardArray);
    } else {
        mixedCardArray = shuffleCards(defaultCardArray8x8)
    }

    if(document.getElementById('main_container')) {
        document.getElementById('main_container').remove();
    }


    const container = document.createElement("div");
    container.setAttribute('id', 'main_container');


    if (getRadioValue() === 6) {
        container.classList.add("big");
    } else if (getRadioValue() === 4) {
        container.classList.add("small");
    } else if (getRadioValue() === 8) {
    container.classList.add("large");
}
    mixedCardArray.forEach(cardItem => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.id = "card" + cardItem;
        card.value = cardItem;
        container.appendChild(card);

        const backFace = document.createElement("img");
        backFace.classList.add('back-face');

        const frontFace = document.createElement("img");
        frontFace.setAttribute('src', cardItem);
        frontFace.classList.add('front-face');

        card.appendChild(backFace);
        card.appendChild(frontFace);

        document.getElementById('memory_board').appendChild(container);

        card.addEventListener('click', flipCard);

    });
};


const changeBoard = () => {
console.log(1)
};


const changeDifficulty = () => {
    const radioButtons = document.getElementsByName('difficulty');
    radioButtons.forEach(radioButton => {

        radioButton.addEventListener('change', function (e) {
            if(parseInt(e.currentTarget.value) === 6) {
                e.currentTarget.checked = true;
                createBoard();
            }
            else if(parseInt(e.currentTarget.value) === 8) {
                e.currentTarget.checked = true;
                createBoard();
            } else {
                e.currentTarget.checked = true;
                createBoard();
            }
        });
    });

};


createBoard();
changeDifficulty();



