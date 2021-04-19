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
          onChange={(e) => {
            props.handler(e, 0);
          }}
          value={props.info[0].input}
        />
        <textarea
          className="Builder__input Builder__input--summary"
          placeholder="Summary"
          autoComplete="off"
          data-index="1"
          onChange={(e) => {
            props.handler(e, 1);
          }}
          value={props.info[1].input}
        />
      </div>
      <div className="Builder__card">
        {props.info.map((el, index) => {
          if (index === 0 || index === 1) return false;
          return (
            <input
              className="Builder__input"
              type="text"
              placeholder={el.placeHolder}
              autoComplete="off"
              onChange={(e) => {
                props.handler(e, index);
              }}
              value={el.input}
              key={el.id}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default InfoInput;
