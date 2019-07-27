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

let width = window.innerWidth;
let height = window.innerHeight;
let particles = [];

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.id = "firework-canvas";
canvas.width = width;
canvas.height = height;
canvas.style.display = "block";
canvas.style.pointerEvents = "none";
canvas.style.position = "fixed";
canvas.style.zIndex = "1";
canvas.style.left = "0";
canvas.style.top = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.opacity = ".85";
document.body.appendChild(canvas);

const create = () => {
  if (particles.length > 20) return;
  particles.push(new FireworkClass(context, width, height, 100));
  setTimeout(create, 6000);
};

const loop = () => {
  requestAnimationFrame(loop);
  context.fillStyle = "rgba(0,0,0,0.2)";
  context.fillRect(0, 0, width, height);

  for (let p of particles) {
    if (p.complete()) p.reset();
    p.update(width, height);
    p.draw();
  }
};