let flippedCards = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const boardSize = getRadioValue();

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

const checkForMatch = () => {
    if (firstCard.value === secondCard.value) {
        score += 1;
        scoreContainer.innerHTML = `Score is ${score}`;
        removeFlipCards();
        flippedCards += 2;
        if(flippedCards === Math.pow(boardSize, 2)) {
            stopTime();
            const radioButtons = document.getElementsByName('difficulty');
            radioButtons.forEach(radioButton => {
                radioButton.checked = false;
            });
            const user = JSON.parse(localStorage.getItem(keyUser));
            user.score = score;
            localStorage.setItem(keyUser, JSON.stringify(user));
            addRecordToTable();
            const toast = document.getElementById("toast");
            const desc = document.getElementById('desc');
            desc.innerHTML = `Congratulations!!! Your score is ${score}, time is ${timer.innerText}`;
            toast.classList.add('show');
            setTimeout(() => {
                    toast.className = toast.className.replace("show", "");
                },
                5000);
            seeRecordsTable();
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
    firstCard.classList.add('hidden');
    secondCard.classList.add('hidden');
};
