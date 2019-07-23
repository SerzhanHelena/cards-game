class TimerClass {
    constructor() {
        this.timer = document.getElementById('timer');
        this.time = 0;
        this.seconds = 0;
        this.minutes = 0;
    }

    startTime() {
        if (this.time) {
            return
        }
        this.time = setInterval(() => {
            this.seconds++;
            if (this.seconds === 60) {
                this.minutes++;
                this.seconds = 0;
            }
            //this.timer.innerHTML = `${this.minutes} mins ${this.seconds} secs`;
        }, 1000);
    };

    stopTime(){
        clearInterval(this.time);
    };

}