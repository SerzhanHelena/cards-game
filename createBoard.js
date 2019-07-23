const createBoard = () => {
    if (score !== 0) {
        score = 0;
    }
    if(time !== 0) {
        time = 0;
        seconds = 0;
        minutes = 0;
    }
    scoreContainer.innerHTML = `Score is ${score}`;
    let boardSize = getRadioValue();

    const container = document.getElementById('memory_board');
    const slicedColorsArr = colorsArray.slice(0, boardSize * boardSize);
    const randomSlicedColorArr = shuffleCards(slicedColorsArr);

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
            card.value = randomSlicedColorArr[boardSize * i + j];
            card.id = boardSize * i + j;
            const backFace = document.createElement("div");
            backFace.classList.add('back-face');

            const frontFace = document.createElement("div");
            frontFace.style.background = card.value;
            frontFace.classList.add('front-face');

            card.appendChild(backFace);
            card.appendChild(frontFace);
            cell.appendChild(card);
            card.addEventListener('click', flipCard);
            card.addEventListener('click', startTime);
        }
    }
};
