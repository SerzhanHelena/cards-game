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
let mixedCardArray = [];
let flippedCards = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const getRadioValue = () => {
    const radio = document.getElementsByName("difficulty");
    let result;
     for (let i = 0; i < radio.length; i++) {
         if (radio[i].checked) {
             result = radio[i].value;
        }
     }
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

const newBoard = () => {
    mixedCardArray = [];
    if (getRadioValue() === 6) {
        mixedCardArray = shuffleCards(defaultCardArray6x6);
    } else if (getRadioValue() === 4) {
        mixedCardArray = shuffleCards(defaultCardArray);
    }

    flippedCards = 0;
    const container = document.createElement("div");
    if (getRadioValue() === 6) {
        container.setAttribute("class", "big");

    } else if (getRadioValue() === 4) {
        container.setAttribute("class", "small");

    } else if (getRadioValue() === 8) {
    container.setAttribute("class", "large");

}
    for (let i = 0; i < mixedCardArray.length; i++) {

        const card = document.createElement("div");

        card.setAttribute("class", "card");

        card.id = "card" + i;
        card.value = mixedCardArray[i];
        // console.log(card.value)
        container.appendChild(card);

        const backFace = document.createElement("img");
        backFace.setAttribute('class', 'back-face');

        const frontFace = document.createElement("img");
        frontFace.setAttribute('src', mixedCardArray[i]);
        frontFace.setAttribute('class', 'front-face');

        card.appendChild(backFace);
        card.appendChild(frontFace);

        document.getElementById('memory_board').appendChild(container);

        card.addEventListener('click', flipCard);


    }

};

newBoard();

