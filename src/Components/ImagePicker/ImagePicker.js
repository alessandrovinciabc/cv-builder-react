import React from 'react';

import './ImagePicker.css';

function ImagePicker(props) {
  return (
    <div className={`ImagePicker ${props.className}`}>
      <div className="ImagePicker__display">
        <img
          src={props.currentImg || props.defaultImg}
          className="ImagePicker__image"
          alt=""
          draggable="false"
        />
      </div>
      <input
        className="ImagePicker__input"
        type="file"
        accept="image/*"
        onChange={(e) => {
          props.onChange(e);
        }}
      />
    </div>
  );
}

export default ImagePicker;
