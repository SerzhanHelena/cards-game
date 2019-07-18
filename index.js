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
let score = 0;
let records = [];
const keyUsers = "Users";
const keyUser = 'User';
const timer = document.getElementById('timer');
const scoreContainer =  document.getElementById('score');
let time = 0;
let seconds = 0;
let minutes = 0;

const logOut = () => {


    window.location = './form/form.html';
};


const addRecordTable = () => {
    const user = JSON.parse(localStorage.getItem(keyUser));
    //const recordsTable = document.createElement("table");

    if(JSON.parse(localStorage.getItem(keyUsers)=== null)) {
        let users = [user];
       localStorage.setItem(keyUsers, JSON.stringify(users));
    } else {
        const users = JSON.parse(localStorage.getItem(keyUsers));
        users.push(user);
        localStorage.setItem(keyUsers, JSON.stringify(users));
    }
    const users = JSON.parse(localStorage.getItem(keyUsers));
    if(users.length) {
       users.sort((a,b) => {
            return b.score - a.score;
        })
    }

    let table = document.createElement('table');
    let tr = document.createElement('tr');
    table.appendChild(tr);
    tr.appendChild(document.createElement('th'));
    tr.appendChild(document.createElement('th'));
    table.rows[0].cells[0].innerHTML = 'Username';
    table.rows[0].cells[1].innerHTML = 'Score';

    document.body.appendChild(table);
    let i = 1;

    users.forEach(elem => {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        tr.appendChild(document.createElement('td'));
        tr.appendChild(document.createElement('td'));
        table.rows[i].cells[0].textContent = elem.userName;
        table.rows[i].cells[1].innerHTML = elem.score;
        i++;
    });


};
const logOutBtn = document.getElementById('log-out');
logOutBtn.addEventListener('click', logOut);


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


const startTime = () => {
    if (time) {
        return;
    }
    time = setInterval(() => {
        seconds++;
        if(seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.innerHTML = `${minutes} mins ${seconds} secs`;
    }, 1000);
};


const stopTime = () =>	{
    clearInterval (time);
};


 const checkForMatch = () => {
    if (firstCard.value === secondCard.value) {
        score += 1;
        scoreContainer.innerHTML = `Score is ${score}`;
        removeFlipCards();
        flippedCards += 2;
        if(flippedCards === mixedCardArray.length) {
            stopTime();

            const user = JSON.parse(localStorage.getItem(keyUser));
            user.score = score;
            localStorage.setItem(keyUser, JSON.stringify(user));
            addRecordTable();
          const container = document.getElementById('main_container');
          container.innerHTML = '';
            const div = document.createElement('div');
            div.innerHTML = `Congratulations!!! Your score is ${score} time is ${timer.innerText}`;
            container.appendChild(div);
        }
    } else {
        score -= 1;
        scoreContainer.innerHTML = `Score is ${score}`;
        unFlippedCards();
    }

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
    scoreContainer.innerHTML = `Score is ${score}`;
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
        card.addEventListener('click', startTime);


    });
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



