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
          data-index="0"
          onChange={props.handler}
          value={props.info[0]}
        />
        <textarea
          className="Builder__input Builder__input--summary"
          placeholder="Summary"
          autoComplete="off"
          data-index="1"
          onChange={props.handler}
          value={props.info[1]}
        />
      </div>
      <div className="Builder__card">
        <input
          className="Builder__input"
          type="text"
          placeholder="City"
          autoComplete="off"
          data-index="2"
          onChange={props.handler}
          value={props.info[2]}
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Phone"
          autoComplete="off"
          data-index="3"
          onChange={props.handler}
          value={props.info[3]}
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Email"
          autoComplete="off"
          data-index="4"
          onChange={props.handler}
          value={props.info[4]}
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Linkedin"
          autoComplete="off"
          data-index="5"
          onChange={props.handler}
          value={props.info[5]}
        />
        <input
          className="Builder__input"
          type="text"
          placeholder="Github"
          autoComplete="off"
          data-index="6"
          onChange={props.handler}
          value={props.info[6]}
        />
      </div>
    </React.Fragment>
  );
}

export default InfoInput;
