import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Countdown, { zeroPad } from 'react-countdown';
import useSound from 'use-sound';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { startTimerContinuous, onCompleteContinuous } from '../../utils/timer/continuous';
import { startTimerNonContinuous, onCompleteNonContinuous } from '../../utils/timer/nonContinuous';
import './style.css';

import beep2 from '../../assets/beep-1.wav';

export default function TimerPage() {

  const [play] = useSound(beep2);

  const BACKGROUND_COLORS = {
    INITIAL: "white",
    PREPARE: "yellow",
    WORK: "green",
    REST: "red",
    BREAK: "blue",
    COMPLETED: "white"
  }

  const MODES = {
    PREPARE: "Prepare",
    WORK: "Work",
    REST: "Rest",
    BREAK: "Break",
    COMPLETED: "Completed"
  }

  const timerRef = useRef();

  const [workoutState] = useWorkoutContext();

  const initialState = {
    rep: 1,
    set: 1,
    mode: MODES.PREPARE,
    countdown: workoutState.prepare
  }

  const [timerState, setTimerState] = useState(initialState);
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    return () => document.body.style.backgroundColor = BACKGROUND_COLORS.INITIAL;
  }, [])

  function startTimer() {
    if (workoutState.continuous === false) {
      startTimerNonContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS);
    } else {
      startTimerContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS);
    }
    timerRef.current.api.start();
    setPlayState(true)
  }

  function pauseTimer() {
    timerRef.current.api.pause();
  }

  function onComplete() {
    play();
    setPlayState(false)
    if (workoutState.continuous === false) {
      onCompleteNonContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS);
    } else {
      onCompleteContinuous(timerState, setTimerState, workoutState, MODES, BACKGROUND_COLORS);
      startTimer();
    }
  }

  function renderer({ minutes, seconds }) {
    return (
      <span id="countdown">{zeroPad(minutes)}:{zeroPad(seconds)}</span>
    )
  }

  return (
    <>
      <div className="timer-labels-div">
        <label className="flow-text title-label"><span>{workoutState.title}</span></label>
        {workoutState.continuous ?
          <label className="flow-text reps-sets-labels">Continuous</label>
          : null}
        <label className="flow-text reps-sets-labels">
          Rep: <span id="reps-left">{timerState.rep}/{workoutState.reps}</span>
        </label>
        <label className="flow-text reps-sets-labels">
          Set: <span id="sets-left">{timerState.set}/{workoutState.sets}</span>
        </label>
        <label className="flow-text">
          <span id="stage">{timerState.mode}</span>
        </label>
        <label className="flow-text">
          <Countdown
            ref={timerRef}
            autoStart={false}
            date={Date.now() + timerState.countdown * 1000}
            renderer={renderer}
            onComplete={() => onComplete()}
          />
        </label>
      </div>
      <div className="timer-button-div">
        {timerState.mode === MODES.COMPLETED ?
          <>
            <Link to="/">
              <button className="timer-buttons flow-text">
                <i className="fas fa-stop"></i>
              </button>
            </Link>
            <button className="timer-buttons flow-text" onClick={() => setTimerState(initialState)}>
              <i className="fas fa-redo-alt"></i>
            </button>
          </>
          :
          <>
            {
              playState === true ?
                <button className="timer-buttons flow-text" id="pause" onClick={() => pauseTimer()}>
                  <i className="fas fa-pause"></i>
                </button>
                :
                <button className="timer-buttons flow-text" id="start" onClick={() => startTimer()}>
                  <i className="fas fa-play"></i>
                </button>
            }
            <Link to="/">
              <button className="timer-buttons flow-text" id="cancel">
                <i className="fas fa-times"></i>
              </button>
            </Link >
          </>
        }
      </div >
    </>
  )
}
