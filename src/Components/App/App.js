import React, { useState } from 'react';

import './App.css';

import Header from '../Header/Header.js';
import Builder from '../Builder/Builder.js';
import Preview from '../Preview/Preview.js';

import { v4 as uuidv4 } from 'uuid';

import github from '../../Assets/github.png';
import linkedin from '../../Assets/linkedin.png';
import email from '../../Assets/email.png';
import phone from '../../Assets/phone.png';
import place from '../../Assets/place.png';

const NUMBER_OF_INPUTS = 4;

let createSection = (title) => {
  return {
    id: uuidv4(),
    title: title,
    input: Array(NUMBER_OF_INPUTS).fill(''),
    list: [],
  };
};

let createInfoSection = (placeHolder, icon = '') => {
  return {
    id: uuidv4(),
    placeHolder,
    icon,
    input: '',
  };
};

function App(props) {
  const [currentImage, setCurrentImage] = useState('');

  let handleImgChange = (e) => {
    setCurrentImage((previousImage) => {
      let newFileURL = URL.createObjectURL(e.target.files[0]);

      if (previousImage) URL.revokeObjectURL(currentImage);

      return newFileURL;
    });
  };

  let infoSectionNames = [
    'Your name',
    'Summary',
    ['City', place],
    ['Phone', phone],
    ['Email', email],
    ['Linkedin', linkedin],
    ['Github', github],
    'Title/Profession',
  ];

  let infoSections = infoSectionNames.map((section) => {
    if (typeof section === 'string') return createInfoSection(section);

    return createInfoSection(...section);
  });

  const [info, setInfo] = useState(infoSections);

  let handleInfoChange = (e, index) => {
    setInfo((previousInfo) => {
      let copy = JSON.parse(JSON.stringify(previousInfo));
      copy[index].input = e.target.value;

      return copy;
    });
  };

  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  let handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  let handleSkillAdd = (e) => {
    if (!skillInput) return;

    setSkillInput((previousInput) => {
      setSkills((previousSkills) => {
        return previousSkills.concat([{ id: uuidv4(), text: previousInput }]);
      });

      return '';
    });
  };

  let handleSkillDelete = (index) => {
    setSkills((previousSkills) => {
      let filtered = previousSkills.slice();
      filtered.splice(index, 1);

      return filtered;
    });
  };

  const sectionNames = ['Education', 'Experience', 'Projects'];
  let sectionObjects = sectionNames.map(createSection);
  const [sections, setSections] = useState(sectionObjects);

  let handleExperienceInputs = (e, sectionNumber) => {
    let indexOfInput = e.target.dataset.index;

    setSections((previous) => {
      let copy = JSON.parse(JSON.stringify(previous));

      copy[sectionNumber].input[indexOfInput] = e.target.value;

      return copy;
    });
  };

  let createExperience = (title, description, startDate, endDate) => {
    return {
      id: uuidv4(),
      title,
      description,
      startDate,
      endDate,
    };
  };

  let handleExperienceAdd = (sectionNumber) => {
    setSections((previous) => {
      if (!previous[sectionNumber].input[0]) return;
      let copy = JSON.parse(JSON.stringify(previous));

      let newExperience = createExperience(...previous[sectionNumber].input);
      copy[sectionNumber].list.push(newExperience);

      copy[sectionNumber].input = Array(NUMBER_OF_INPUTS).fill('');

      return copy;
    });
  };

  let handleExperienceDelete = (e, sectionNumber) => {
    let index = e.target.dataset.index;

    setSections((previous) => {
      let copy = JSON.parse(JSON.stringify(previous));
      copy[sectionNumber].list.splice(index, 1);

      return copy;
    });
  };

  let handleExperienceFormReset = (sectionNumber) => {
    setSections((previous) => {
      let copy = JSON.parse(JSON.stringify(previous));
      copy[sectionNumber].input = Array(NUMBER_OF_INPUTS).fill('');

      return copy;
    });
  };

  let [previewMode, setPreviewMode] = useState(false);

  let handlePreviewToggle = () => {
    setPreviewMode((previous) => !previous);
  };

  let skillHandlers, sectionHandlers;

  skillHandlers = {
    input: handleSkillInputChange,
    add: handleSkillAdd,
    delete: handleSkillDelete,
  };

  sectionHandlers = {
    input: handleExperienceInputs,
    reset: handleExperienceFormReset,
    add: handleExperienceAdd,
    delete: handleExperienceDelete,
  };

  let handlers = {
    img: handleImgChange,
    skill: skillHandlers,
    section: sectionHandlers,
  };

  return (
    <div className="App">
      <Header logo="CV BUILDER">
        <div className="PreviewHeader">
          <label className="PreviewToggler">
            <input
              className="PreviewToggler__input"
              type="checkbox"
              checked={previewMode}
              onChange={handlePreviewToggle}
            />
            <div className="PreviewToggler__slider"></div>
          </label>
        </div>
      </Header>
      {previewMode ? (
        <Preview
          currentImg={currentImage}
          info={info}
          skills={skills}
          sections={sections}
        />
      ) : (
        <Builder
          handlers={handlers}
          currentImg={currentImage}
          info={info}
          handleInfoChange={handleInfoChange}
          skillInput={skillInput}
          skills={skills}
          sections={sections}
        />
      )}
    </div>
  );
}

export default App;
