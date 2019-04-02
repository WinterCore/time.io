import visualize from "./visualize";

import { secondsToHis } from "./helpers";

import { append, read } from "./store";

class Timer {
    startTime      = null;
    secondsPassed  = 0;
    isRunning      = false;
    intervalId     = 0;
    currentProject = null;

    start() {
        this.startTime      = Date.now();
        this.isRunning      = true;
        visualize(secondsToHis(this.secondsPassed));
        this.intervalId = setInterval(() => {
            this.secondsPassed += 1;
            // if the duration spans into another day cut the duration to the end of the previous day and save it
            if (this.spansAcross2Days()) {
                append(this.currentProject, { start : this.startTime, finish : Date.now() - 1000 })
                    .catch(console.log);
                this.startTime = Date.now();
            }
            visualize(secondsToHis(this.secondsPassed));
        }, 1000);
    }

    spansAcross2Days() {
        const startDate   = new Date(this.startTime);
        const currentDate = new Date();
        return startDate.getDate() !== currentDate.getDate();
    }    

    async stop() {
        await append(this.currentProject, { start : this.startTime, finish : Date.now() });
        this.isRunning     = false;
        this.secondsPassed = 0;
        clearInterval(this.intervalId);
    }

    reset() {
        this.isRunning      = false;
        this.secondsPassed  = 0;
        this.startTime      = null;
        this.currentProject = null;
    }
}


export default new Timer();