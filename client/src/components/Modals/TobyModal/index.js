import React, { useEffect, useRef } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { MODES } from '../../../utils/timer/modes';
import toby1 from '../../../assets/images/toby_1.jpg';
import toby2 from '../../../assets/images/toby_2.jpg';
import toby3 from '../../../assets/images/toby_3.jpg';
import toby4 from '../../../assets/images/toby_4.jpg';
import toby5 from '../../../assets/images/toby_5.jpg';
import toby6 from '../../../assets/images/toby_6.jpg';
import toby7 from '../../../assets/images/toby_7.jpg';
import toby8 from '../../../assets/images/toby_8.jpg';
import './style.css';

export default function TobyModal({ timerState }) {

  const modalRef = useRef();

  const tobyImages = [toby1, toby2, toby3, toby4, toby5, toby6, toby7, toby8]

  if (timerState.mode === MODES.COMPLETED) {
    M.Modal.getInstance(modalRef.current).open()
  }

  useEffect(() => {
    const options = {
      onOpenStart: () => { },
      onOpenEnd: () => { },
      onCloseStart: () => { },
      onCloseEnd: () => { },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: true,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(modalRef.current, options);
  }, [])

  return (
    <div id="toby-modal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <img className='toby-image' src={tobyImages[Math.ceil(Math.random() * tobyImages.length)]} alt='toby-image'></img>
      </div>
      <div className="modal-footer">
        <button className="modal-close btn-flat">Confirm</button>
      </div>
    </div>
  )
}
