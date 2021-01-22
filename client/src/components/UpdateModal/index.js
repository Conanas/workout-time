import React from 'react';
import { MESSAGES, BUTTONS } from '../../utils/actions';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { useEditContext } from '../../utils/EditContext';
import { START } from '../../utils/actions';
import API from '../../utils/API';

export default function UpdateModal() {
  const [workoutState] = useWorkoutContext();
  const [editState, editDispatch] = useEditContext();

  function updateWorkout() {
    editDispatch({ type: START })
    API.putWorkout(workoutState)
      .then(res => res.json)
      .catch(err => console.log(err));
  }

  return (
    <div id="save-message-modal" className="modal">
      <div className="modal-content">
        <h4 className="flow-text">{MESSAGES.ARE_YOU_SURE}</h4>
        <label>{MESSAGES.OVERWRITE}</label>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat">{BUTTONS.CANCEL}</button>
        <button className="modal-close waves-effect waves-green btn-flat" onClick={() => updateWorkout()}>{BUTTONS.CONFIRM}</button>
      </div>
    </div >
  )
}