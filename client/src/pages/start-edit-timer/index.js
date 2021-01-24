import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputList from '../../components/InputList/';
import UpdateModal from '../../components/UpdateModal/';
import API from '../../utils/API';
import { useWorkoutContext } from "../../utils/WorkoutContext";
import { useEditContext } from '../../utils/EditContext';
import { userUserContext, useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS, EDIT, START } from '../../utils/actions';
import './style.css';

export default function StartEditTimer(props) {
  const [editState, dispatchEditState] = useEditContext();
  const [workoutState, dispatchWorkout] = useWorkoutContext();
  const [userState, dispatchUser] = useUserContext();

  useEffect(() => {
    dispatchEditState({ type: START })
    let workoutId = "";
    if (localStorage.workoutId) {
      workoutId = localStorage.workoutId;
    } else {
      workoutId = props.match.params.id;
    }
    API.getWorkout(workoutId)
      .then(res => {
        if (res.data) {
          dispatchWorkout({ type: SET_ACTIONS.workout, payload: res.data });
        }
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <div className="row">
        <h4>{editState === START ? "Start" : "Edit"} Workout</h4>
        <ul className="edit-timer-list">
          <InputList />
        </ul>
      </div>
      <div className="button-div">
        {editState === START ?
          <>
            <Link to="/timer">
              <button className="form-button">
                <i className="fas fa-play flow-text"></i>
              </button>
            </Link>
            <button className="form-button" onClick={() => dispatchEditState({ type: EDIT })}>
              <i className="fas fa-edit flow-text"></i>
            </button>
          </>
          :
          <>
            {userState.email === null ?
              null
              :
              <button
                className="form-button modal-trigger"
                data-target="save-message-modal">
                <i className="fas fa-save flow-text"></i>
              </button>}
            <button className="form-button" onClick={() => dispatchEditState({ type: START })}>
              <i className="fas fa-check-square flow-text"></i>
            </button>
          </>
        }
      </div>
      <UpdateModal />
    </>
  )
}