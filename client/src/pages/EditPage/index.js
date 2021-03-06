import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputList from '../../components/InputList/';
import UpdateModal from '../../components/Modals/UpdateModal';
import { useEditContext } from '../../utils/contexts/EditContext';
import { EDIT, START } from '../../utils/contexts/edit-state-strings';

export default function EditPage() {
  const [editState, dispatchEditState] = useEditContext();

  useEffect(() => {
    let sidenav = document.querySelector('#mobile-demo');
    M.Sidenav.init(sidenav, {});
    dispatchEditState({ type: EDIT })
  }, [])

  return (
    <>
      <div className="row">
        <h4>Edit Workout</h4>
        <ul className="edit-timer-list">
          <InputList />
        </ul>
      </div>
      <div className="button-div">
        {
          editState === START ?
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