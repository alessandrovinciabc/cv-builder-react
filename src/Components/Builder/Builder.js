import React from 'react';

import './Builder.css';

//Assets
import defaultImg from '../../Assets/picture-placeholder.png';

//Components
import ImagePicker from '../ImagePicker/ImagePicker.js';
import InfoInput from '../InfoInput/InfoInput.js';
import SkillList from '../SkillList/SkillList.js';
import ExperienceList from '../ExperienceList/ExperienceList.js';

import { v4 as uuidv4 } from 'uuid';

class Builder extends React.Component {
  constructor(props) {
    super(props);

    const NUMBER_OF_INPUTS = 4;

    this.state = {
      currentImg: '',
      skillInput: '',
      skills: [],
      educationInput: Array(NUMBER_OF_INPUTS).fill(''),
      experienceInput: Array(NUMBER_OF_INPUTS).fill(''),
      projectsInput: Array(NUMBER_OF_INPUTS).fill(''),
      education: [],
      experience: [],
      projects: [],
    };

    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleSkillInputChange = this.handleSkillInputChange.bind(this);
    this.handleSkillAdd = this.handleSkillAdd.bind(this);
    this.handleSkillDelete = this.handleSkillDelete.bind(this);
    this.handleExperienceInputs = this.handleExperienceInputs.bind(this);
  }

  handleImgChange(e) {
    let newFileURL = URL.createObjectURL(e.target.files[0]);

    this.setState((state) => {
      if (state.currentImg) {
        URL.revokeObjectURL(state.currentImg);
      }
      return { currentImg: newFileURL };
    });
  }

  handleSkillInputChange(e) {
    this.setState({ skillInput: e.target.value });
  }

  handleSkillAdd(e) {
    this.setState((state) => {
      if (state.skillInput !== '') {
        return {
          skills: state.skills.concat([
            { id: uuidv4(), text: state.skillInput },
          ]),
          skillInput: '',
        };
      }
    });
  }

  handleSkillDelete(index) {
    this.setState((state) => {
      let filtered = state.skills.slice();
      filtered.splice(index, 1);

      return {
        skills: filtered,
      };
    });
  }

  handleExperienceInputs(e, sectionNumber) {
    //sectionNumber: 0 for education, 1 for experience, 2 for projects
    let indexOfInput = e.target.dataset.index;
    this.setState((state) => {
      let copy;
      switch (sectionNumber) {
        case 0:
          copy = state.educationInput.slice();
          copy[indexOfInput] = e.target.value;
          return { educationInput: copy };
        case 1:
          copy = state.experienceInput.slice();
          copy[indexOfInput] = e.target.value;
          return { experienceInput: copy };
        case 2:
          copy = state.projectsInput.slice();
          copy[indexOfInput] = e.target.value;
          return { projectsInput: copy };
        default:
          break;
      }
    });
  }

  render() {
    let { currentImg, skillInput, skills } = this.state;

    let {
      handleImgChange,
      handleSkillInputChange,
      handleSkillAdd,
      handleSkillDelete,
    } = this;

    let skillHandlers = {
      input: handleSkillInputChange,
      add: handleSkillAdd,
      delete: handleSkillDelete,
    };

    return (
      <div className="Builder">
        <div className="Builder__info">
          <ImagePicker
            className="Builder__card"
            currentImg={currentImg}
            defaultImg={defaultImg}
            onChange={handleImgChange}
          />
          <InfoInput />
        </div>
        <SkillList input={skillInput} list={skills} handlers={skillHandlers} />
        <ExperienceList
          name="Education"
          inputs={this.state.educationInput}
          handler={(e) => {
            this.handleExperienceInputs(e, 0);
          }}
        />
        <ExperienceList
          name="Experience"
          inputs={this.state.experienceInput}
          handler={(e) => {
            this.handleExperienceInputs(e, 1);
          }}
        />
        <ExperienceList
          name="Projects"
          inputs={this.state.projectsInput}
          handler={(e) => {
            this.handleExperienceInputs(e, 2);
          }}
        />
      </div>
    );
  }
}

export default Builder;
