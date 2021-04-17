import React from 'react';

import '../Builder/Builder.css';

function SkillList(props) {
  let { handlers } = props;

  let handleEnterKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlers.add();
    }
  };

  return (
    <div className="Builder__skills Builder__section">
      <h2>Skills</h2>
      <input
        className="Builder__input Skill__input"
        type="text"
        autoComplete="off"
        value={props.input}
        onChange={handlers.input}
        onKeyDown={handleEnterKeyDown}
      />
      <button className="Skill__confirm Builder__button" onClick={handlers.add}>
        Add
      </button>
      <div className="Skill_list">
        <ul>
          {props.list.map((skill, index) => {
            return (
              <li className="Skill" key={skill.id}>
                {skill.text}{' '}
                <button
                  className="Button--delete"
                  onClick={() => {
                    handlers.delete(index);
                  }}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SkillList;
