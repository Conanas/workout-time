import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import { useUserContext } from '../../utils/UserContext';
import { SET_ACTIONS } from '../../utils/actions';
import API from '../../utils/API';
import './style.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLogin() {
  const [userState, dispatchUser] = useUserContext();

  const getOrCreateUser = async (profileObj) => {
    try {
      const { email } = profileObj;
      let user = await API.getUser(email)
      if (user.data === null) {
        let createdUser = await API.createUser(profileObj)
        dispatchUser({ type: SET_ACTIONS.user, payload: createdUser })
        console.log("userState", userState)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    getOrCreateUser(res.profileObj)
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert("Login failed");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="google-button">
      <img src="/icons/google.svg" alt="google login" className="icon"></img>

      <span className="google-button-text">Sign in with Google</span>
    </button>
  );
}
