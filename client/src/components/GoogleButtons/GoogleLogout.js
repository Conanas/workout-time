import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useUserContext } from '../../utils/UserContext';
import { useWorkoutContext } from '../../utils/WorkoutContext';
import { SET_ACTIONS } from '../../utils/actions';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLogout() {
  const [userState, dispatchUser] = useUserContext();
  const [_, dispatchWorkout] = useWorkoutContext();

  const onLogoutSuccess = (res) => {
    dispatchUser({ type: SET_ACTIONS.userLogout })
    dispatchWorkout({ type: SET_ACTIONS.reset })
    console.log('Logged out Success');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="google-button">
      Sign out
    </button>
  );
}
