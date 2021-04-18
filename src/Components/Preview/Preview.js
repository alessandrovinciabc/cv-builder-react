import React from 'react';

import './Preview.css';

function Preview(props) {
  return (
    <div className="Preview">
      <img src={props.currentImg} alt="" />
      <div>{props.skills}</div>
    </div>
  );
}

export default Preview;
