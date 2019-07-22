const timer = document.getElementById('timer');
let time = 0;
let seconds = 0;
let minutes = 0;

const startTime = () => {
    if (time) {
        return
    }
    time = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timer.innerHTML = `${minutes} mins ${seconds} secs`;
    }, 1000);
};

const stopTime = () => {
    clearInterval(time);
};