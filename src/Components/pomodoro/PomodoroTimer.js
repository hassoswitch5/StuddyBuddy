import React, { useEffect, useState } from 'react';
import './PomodoroTimer.css';


const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer;
        if (isActive && (minutes >= 0 || seconds > 0)) {
            timer = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        new Audio("sound1.mp3").play();
                        setIsActive(false);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActive, minutes, seconds]);

    const handleStart = () => {
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <div className="pomodoro-timer">
            <h1>Pomodoro Timer</h1>
            <br></br>
            <br></br>
            <div className="timer">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <br></br>
            <br></br>
            <div className="controls">
                <button onClick={handleStart} disabled={isActive}>Start</button>
                <button onClick={handleStop} disabled={!isActive}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div>
                <br></br>
                <br></br>
                <label>
                    Set Minutes:
                    <input
                        className="set-timer"
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, e.target.value))}
                        disabled={isActive}
                    />
                </label>
            </div>
        </div>
    );
};

export default PomodoroTimer;