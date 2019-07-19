let mixedCardArray = [];

const createBoard = () => {
    if (score !== 0) {
        score = 0;
    }
    scoreContainer.innerHTML = `Score is ${score}`;
    mixedCardArray = [];
    if (getRadioValue() === 6) {
        mixedCardArray = shuffleCards(defaultCardArray6x6);
    } else if (getRadioValue() === 4) {
        mixedCardArray = shuffleCards(defaultCardArray);
    } else {
        mixedCardArray = shuffleCards(defaultCardArray8x8)
    }

    if (document.getElementById('main_container')) {
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