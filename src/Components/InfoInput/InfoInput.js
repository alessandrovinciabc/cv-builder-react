import React from 'react';

import '../Builder/Builder.css';
import './InfoInput.css';

function InfoInput(props) {
  return (
    <React.Fragment>
      <div className="Builder__card">
        <input
          className="Builder__input Builder__input--name"
          type="text"
          placeholder="Your name"
          autoComplete="off"
        />
        <textarea
          className="Builder__input Builder__input--summary"
          placeholder="Summary"
          autoComplete="off"
        />
      </div>
      <div className="Builder__card">
        <input
          className="Builder__input"
          type="text"
          placeholder="City"
          autoComplete="off"
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Phone"
          autoComplete="off"
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Email"
          autoComplete="off"
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Linkedin"
          autoComplete="off"
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Github"
          autoComplete="off"
        />
      </div>
    </React.Fragment>
  );
}

export default InfoInput;
