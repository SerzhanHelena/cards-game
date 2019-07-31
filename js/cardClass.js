const timer = new TimerClass(0, 0, 0);

class CardClass {
  constructor() {
    this.flippedCards = 0;
    this.hasFlippedCard = false;
    this.lockBoard = false;
    this.firstCard;
    this.secondCard;
    this.scoreContainer = document.getElementById("score");
    this.score = 0;
    this.boardSize = getRadioValue();
  }
  createBoard() {
    if (this.score !== 0) {
      this.score = 0;
      this.flippedCards = 0;
    }
    if (timer.time !== 0) {
      timer.time = 0;
      timer.seconds = 0;
      timer.minutes = 0;
    }
    this.scoreContainer.innerHTML = `Score is ${this.score}`;
    this.boardSize = getRadioValue();

    const container = document.getElementById("memory_board");
    const slicedColorsArr = colorsArray.slice(
      0,
      this.boardSize * this.boardSize
    );
    const randomSlicedColorArr = shuffleCards(slicedColorsArr);

    for (let i = 0; i < this.boardSize; i++) {
      const row = document.createElement("div");

      row.classList.add("row");
      container.appendChild(row);

      for (let j = 0; j < this.boardSize; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        row.appendChild(cell);

        const card = document.createElement("div");
        card.classList.add("card");
        card.value = randomSlicedColorArr[this.boardSize * i + j];
        card.id = this.boardSize * i + j;
        const backFace = document.createElement("div");
        backFace.classList.add("back-face");

        const frontFace = document.createElement("div");
        frontFace.style.background = card.value;
        frontFace.classList.add("front-face");

        card.appendChild(backFace);
        card.appendChild(frontFace);
        cell.appendChild(card);
        card.addEventListener("click", this.flipCard.bind(this));
        card.addEventListener("click", timer.startTime.bind(timer));
      }
    }
  }

  flipCard(e) {
    if (this.lockBoard) return;

    const card = e.currentTarget;
    card.classList.add("flip");

    if (!this.hasFlippedCard) {
      this.hasFlippedCard = true;
      this.firstCard = card;
      return;
    }
    this.secondCard = card;
    this.hasFlippedCard = false;

    this.checkForMatch();
  }

  checkForMatch() {
    if (
      this.firstCard.value === this.secondCard.value &&
      this.firstCard.id !== this.secondCard.id
    ) {
      this.score += 1;
      this.scoreContainer.innerHTML = `Score is ${this.score}`;
      this.removeFlipCards();
      this.flippedCards += 2;
      if (this.flippedCards === Math.pow(this.boardSize, 2) || this.flippedCards === this.boardSize * this.boardSize - 2) {
        timer.stopTime();
        const radioButtons = document.getElementsByName("difficulty");
        radioButtons.forEach(radioButton => {
          radioButton.checked = false;
        });
        const user = JSON.parse(localStorage.getItem(table.keyUser));
        user.score = this.score;
        localStorage.setItem(table.keyUser, JSON.stringify(user));

        table.addRecordToTable();

        const toast = document.getElementById("toast");
        const desc = document.getElementById("desc");

        create();
        loop();

        desc.innerHTML = `Congratulations!!! Your score is ${
          this.score
        }, time is ${timer.minutes} min ${timer.seconds} secs`;
        toast.classList.add("show");
        setTimeout(() => {
          toast.className = toast.className.replace("show", "");
        }, 5000);

        if(document.getElementById("firework-canvas")) {
        setTimeout(() => {
          let canvas = document.getElementById("firework-canvas");
          document.body.removeChild(canvas);
          table.seeRecordsTable();
        }, 5000);
      }
      }
    } else {
      this.score -= 1;
      this.scoreContainer.innerHTML = `Score is ${this.score}`;
      this.unFlippedCards();
    }
  }

  unFlippedCards() {
    this.lockBoard = true;
    setTimeout(() => {
      this.firstCard.classList.remove("flip");
      this.secondCard.classList.remove("flip");
      this.lockBoard = false;
      this.resetBoard();
    }, 1500);
  }

  resetBoard() {
    [this.hasFlippedCard, this.lockBoard] = [false, false];
    [this.firstCard, this.secondCard] = [null, null];
  }

  removeFlipCards() {
      this.firstCard.classList.add("hidden");
      this.secondCard.classList.add("hidden");
   
  }
}
