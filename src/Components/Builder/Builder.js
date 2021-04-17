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
const NUMBER_OF_INPUTS = 4;

class Builder extends React.Component {
  constructor(props) {
    super(props);

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
    this.handleExperienceAdd = this.handleExperienceAdd.bind(this);
    this.handleExperienceDelete = this.handleExperienceDelete.bind(this);
    this.handleExperienceFormReset = this.handleExperienceFormReset.bind(this);
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

  handleExperienceAdd(sectionNumber) {
    this.setState((state) => {
      let copy;
      switch (sectionNumber) {
        case 0:
          copy = state.education.slice();
          copy.push({
            id: uuidv4(),
            title: state.educationInput[0],
            description: state.educationInput[1],
            startDate: state.educationInput[2],
            endDate: state.educationInput[3],
          });
          return {
            education: copy,
            educationInput: Array(NUMBER_OF_INPUTS).fill(''),
          };
        case 1:
          copy = state.experience.slice();
          copy.push({
            id: uuidv4(),
            title: state.experienceInput[0],
            description: state.experienceInput[1],
            startDate: state.experienceInput[2],
            endDate: state.experienceInput[3],
          });
          return {
            experience: copy,
            experienceInput: Array(NUMBER_OF_INPUTS).fill(''),
          };
        case 2:
          copy = state.projects.slice();
          copy.push({
            id: uuidv4(),
            title: state.projectsInput[0],
            description: state.projectsInput[1],
            startDate: state.projectsInput[2],
            endDate: state.projectsInput[3],
          });
          return {
            projects: copy,
            projectsInput: Array(NUMBER_OF_INPUTS).fill(''),
          };
        default:
          break;
      }
    });
  }

  handleExperienceDelete(e, sectionNumber) {
    let index = e.target.dataset.index;
    let copy;
    this.setState((state) => {
      switch (sectionNumber) {
        case 0:
          copy = state.education.slice();
          copy.splice(index, 1);
          return { education: copy };
        case 1:
          copy = state.experience.slice();
          copy.splice(index, 1);
          return { experience: copy };
        case 2:
          copy = state.projects.slice();
          copy.splice(index, 1);
          return { projects: copy };
        default:
          break;
      }
    });
  }

  handleExperienceFormReset(sectionNumber) {
    switch (sectionNumber) {
      case 0:
        this.setState({ educationInput: Array(NUMBER_OF_INPUTS).fill('') });
        break;
      case 1:
        this.setState({ experienceInput: Array(NUMBER_OF_INPUTS).fill('') });
        break;
      case 2:
        this.setState({ projectsInput: Array(NUMBER_OF_INPUTS).fill('') });
        break;
      default:
        break;
    }
  }

  render() {
    let {
      currentImg,
      skillInput,
      skills,
      educationInput,
      experienceInput,
      projectsInput,
      education,
      experience,
      projects,
    } = this.state;

    let {
      handleImgChange,
      handleSkillInputChange,
      handleSkillAdd,
      handleSkillDelete,
      handleExperienceInputs,
      handleExperienceAdd,
      handleExperienceDelete,
      handleExperienceFormReset,
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
          inputs={educationInput}
          handler={(e) => {
            handleExperienceInputs(e, 0);
          }}
          onAdd={() => {
            handleExperienceAdd(0);
          }}
          onDelete={(e) => {
            handleExperienceDelete(e, 0);
          }}
          onReset={() => {
            handleExperienceFormReset(0);
          }}
          list={education}
        />
        <ExperienceList
          name="Experience"
          inputs={experienceInput}
          handler={(e) => {
            handleExperienceInputs(e, 1);
          }}
          onAdd={() => {
            handleExperienceAdd(1);
          }}
          onDelete={(e) => {
            handleExperienceDelete(e, 1);
          }}
          onReset={() => {
            handleExperienceFormReset(1);
          }}
          list={experience}
        />
        <ExperienceList
          name="Projects"
          inputs={projectsInput}
          handler={(e) => {
            handleExperienceInputs(e, 2);
          }}
          onAdd={() => {
            handleExperienceAdd(2);
          }}
          onDelete={(e) => {
            handleExperienceDelete(e, 2);
          }}
          onReset={() => {
            handleExperienceFormReset(2);
          }}
          list={projects}
        />
      </div>
    );
  }
}

export default Builder;
