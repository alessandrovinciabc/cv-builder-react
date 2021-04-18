import React from 'react';

import './Preview.css';

function Preview(props) {
  return (
    <div className="PreviewContainer">
      <div className="Preview">
        <div className="SideBar">
          {props.currentImg && (
            <img
              className="Preview__image"
              src={props.currentImg}
              alt=""
              draggable="false"
            />
          )}
          <div className="Skill-list">
            {props.skills.map((skill) => {
              return (
                <div className="Skill" key={skill.id}>
                  {skill.text}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Main"></div>
      </div>
    </div>
  );
}

export default Preview;
