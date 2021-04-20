import React from 'react';

import './Builder.css';

//Assets
import defaultImg from '../../Assets/picture-placeholder.png';

//Components
import ImagePicker from '../ImagePicker/ImagePicker.js';
import InfoInput from '../InfoInput/InfoInput.js';
import SkillList from '../SkillList/SkillList.js';
import ExperienceList from '../ExperienceList/ExperienceList.js';

function Builder(props) {
  let { handlers, currentImg, skillInput, skills, sections } = props;

  return (
    <div className="Builder">
      <div className="Builder__info">
        <ImagePicker
          className="Builder__card"
          currentImg={currentImg}
          defaultImg={defaultImg}
          onChange={handlers.img}
        />
        <InfoInput info={props.info} handler={props.handleInfoChange} />
      </div>
      <SkillList input={skillInput} list={skills} handlers={handlers.skill} />

      {/*Education, Experience, Projects sections*/}
      {sections.map((section, index) => {
        return (
          <ExperienceList
            key={section.id}
            name={section.title}
            inputs={section.input}
            handler={(e) => {
              handlers.section.input(e, index);
            }}
            onAdd={() => {
              handlers.section.add(index);
            }}
            onDelete={(e) => {
              handlers.section.delete(e, index);
            }}
            onReset={() => {
              handlers.section.reset(index);
            }}
            list={section.list}
          />
        );
      })}
    </div>
  );
}

export default Builder;
