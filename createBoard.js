const createBoard = () => {
    if (score !== 0) {
        score = 0;
    }
    scoreContainer.innerHTML = `Score is ${score}`;
    let mixedCardArray = shuffleCards(colorsArray);
    let boardSize = getRadioValue();

    const container = document.getElementById('memory_board');
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');

        row.classList.add('row');
        container.appendChild(row);

        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);


            const card = document.createElement('div');
            card.classList.add('card');
            card.value = mixedCardArray[Math.floor(Math.random() * boardSize)];
            cell.appendChild(card);

            const backFace = document.createElement("div");
            backFace.classList.add('back-face');

            const frontFace = document.createElement("div");
            frontFace.style.background = card.value;
            frontFace.classList.add('front-face');

            card.appendChild(backFace);
            card.appendChild(frontFace);

            card.addEventListener('click', flipCard);
            card.addEventListener('click', startTime);
        }
    }
};