import visualize from "./visualize";

import { secondsToHis } from "./helper";

class Timer {
    startTime     = null;
    secondsPassed = 0;
    isRunning     = false;
    intervalId    = 0;

    start() {
        this.startTime      = Date.now();
        this.isRunning      = true;
        visualize(secondsToHis(this.secondsPassed));
        this.intervalId = setInterval(() => {
            this.secondsPassed += 1;
            visualize(secondsToHis(this.secondsPassed));
        }, 1000);
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.intervalId);
    }

    getDuration() {
        return this.secondsPassed;
    }

    reset() {
        this.isRunning     = false;
        this.secondsPassed = 0;
        this.startTime     = null;
    }
}


export default new Timer();