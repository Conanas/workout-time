import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../../utils/refreshToken';
import './style.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export default function GoogleLogin() {

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
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
