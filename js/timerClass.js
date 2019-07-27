class TimerClass {
    
    constructor(time, minutes, seconds) {
        this.time = time;
        this.minutes = minutes;
        this.seconds = seconds;  
    }

    static get divTimer() {
        return  document.getElementById('timer');
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
            TimerClass.divTimer.innerHTML = `${this.minutes} minutes ${this.seconds} seconds`;
        }, 1000);
    };

    stopTime() {
        clearInterval(this.time);
    };

}
