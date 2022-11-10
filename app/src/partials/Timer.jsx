import React, { useState, useEffect } from "react";

var defaults = {},
  one_second = 1000,
  one_minute = one_second * 60,
  one_hour = one_minute * 60,
  one_day = one_hour * 24,
  startDate = new Date(),
  animationID,
  isPaused = true;

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
var requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function Timer() {
  const [faceTime, setFaceTime] = useState("00:00:00");
  const [hidden, setHidden] = useState("hidden");

  const tick = () => {
    if (isPaused) return;

    var now = new Date(),
      elapsed = now - startDate,
      parts = [];

    parts[0] = "" + Math.floor(elapsed / one_hour);
    parts[1] = "" + Math.floor((elapsed % one_hour) / one_minute);
    parts[2] =
      "" + Math.floor(((elapsed % one_hour) % one_minute) / one_second);

    parts[0] = parts[0].length == 1 ? "0" + parts[0] : parts[0];
    parts[1] = parts[1].length == 1 ? "0" + parts[1] : parts[1];
    parts[2] = parts[2].length == 1 ? "0" + parts[2] : parts[2];

    setFaceTime(parts.join(":"));
    animationID = requestAnimationFrame(tick);
  };

  function stopTimer() {
    if (!isPaused) {
      console.log("Stop timer");
      isPaused = !isPaused;
      setHidden("hidden");
      setFaceTime(faceTime);
      window.cancelAnimationFrame(animationID);
    }
  }

  function restartTimer() {
    console.log("Restart timer");
    startDate = new Date();
    setFaceTime("00:00:00");
    if (isPaused) {
      isPaused = !isPaused;
      setHidden("");
    }
    animationID = requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (!isPaused) tick();
  }, [faceTime]);

  return (
    <div className="timer-group h-fit">
      <div className={isPaused ? "paused" : ""}>
        <div className="timer hour">
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
        </div>
        <div className="timer minute">
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
        </div>
        <div className="timer second">
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
          <div className={`hand ${hidden}`}>
            <span></span>
          </div>
        </div>
        <div className="stop-start">
          <p>{faceTime}</p>
          <h1>
            <button onClick={stopTimer}>Stop</button>
            <span> | </span>
            <button onClick={restartTimer}>Start</button>
          </h1>
        </div>
      </div>
    </div>
  );
}
export default Timer;
