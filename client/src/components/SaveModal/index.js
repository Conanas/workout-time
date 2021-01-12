import React from 'react';
import { useWorkoutContext } from "../../utils/GlobalState";
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';

export default function SaveModal() {
  const [state, dispatch] = useWorkoutContext();

  function saveWorkout() {
    API.postWorkout(state)
      .then(res => res.json)
      .catch(err => console.log(err));
  }

  return (
    <div id="save-modal" className="modal">
      <div className="modal-content">
        <h4>Enter Save Name</h4>
        <input type="text" onChange={((e) => dispatch({ type: SET_ACTIONS.title, payload: e.target.value }))} />
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={(() => saveWorkout())}>Save</a>
      </div>
    </div>
  )
}