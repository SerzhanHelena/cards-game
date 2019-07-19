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