import React from 'react';

import '../Builder/Builder.css';

function ExperienceList(props) {
  return (
    <div className="Builder__education Builder__section">
      <h2>{props.name}</h2>
      <input
        className="Builder__input Experience__input"
        type="text"
        autoComplete="off"
        placeholder="Title"
      />
      <textarea
        className="Builder__input Builder__input--summary Experience__input"
        placeholder="Description"
        autoComplete="off"
      />
      <label>
        Start date:
        <input
          className="Builder__input Experience__input"
          type="date"
          autoComplete="off"
        />
      </label>
      <label>
        End date:
        <input
          className="Builder__input Experience__input"
          type="date"
          autoComplete="off"
        />
      </label>
      <div>
        <button className="Builder__button">Add</button>
        <button className="Builder__button">Reset</button>
      </div>
    </div>
  );
}

export default ExperienceList;
