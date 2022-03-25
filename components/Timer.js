import { useEffect, useState } from "react";


function generateTimerString(finishedAt, startedAt) {
    let duration;
    if (finishedAt) {
        duration = finishedAt - startedAt;
    }
    else {
        const now = new Date().getTime();
        duration = now - startedAt;
    };
    let hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((duration % (1000 * 60)) / 1000);

    let timer = "";
    if (hours > 0) {
        if (hours < 10) { timer += "0"; };
        timer += hours + ":";
    }
    if (minutes >= 0) {
        if (minutes < 10) { timer += "0"; };
        timer += minutes + ":";
    }
    if (seconds >= 0) {
        if (seconds < 10) { timer += "0"; };
        timer += seconds;
    }

    return (
        <label>{timer}</label>
    );
};

function Timer({ startedAt, finishedAt }) {
    const [timer, setTimer] = useState(generateTimerString(finishedAt, startedAt));

    useEffect(() => {
        setTimeout(() => {
            setTimer(generateTimerString(finishedAt, startedAt));
        }, 500);
    });

    return timer;
};

export default Timer;
