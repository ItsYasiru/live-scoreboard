import { useEffect, useState } from "react";

function generateTimerString(startedAt, finishedAt, offset) {
    let duration;
    if (finishedAt) {
        duration = finishedAt - startedAt;
    } else {
        const now = new Date().getTime();
        duration = now - startedAt;
    }

    if (offset) {
        duration -= offset;
    }

    let hours = Math.floor(
        (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    let minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((duration % (1000 * 60)) / 1000);

    let timer = "";
    if (hours > 0) {
        if (hours < 10) {
            timer += "0";
        }
        timer += hours + ":";
    }
    if (minutes >= 0) {
        if (minutes < 10) {
            timer += "0";
        }
        timer += minutes + ":";
    }
    if (seconds >= 0) {
        if (seconds < 10) {
            timer += "0";
        }
        timer += seconds;
    }

    return <label>{timer}</label>;
}

function Timer(props) {
    const { startedAt, finishedAt, offset } = props;
    const [timer, setTimer] = useState(
        generateTimerString(startedAt, finishedAt, offset),
    );

    useEffect(() => {
        setTimeout(() => {
            setTimer(generateTimerString(startedAt, finishedAt, offset));
        }, 1000);
    });

    return timer;
}

export default Timer;
