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

    const sections = ['Education', 'Experience', 'Projects'];

    let createSection = (title) => {
      return {
        id: uuidv4(),
        title: title,
        input: Array(NUMBER_OF_INPUTS).fill(''),
        list: [],
      };
    };

    this.state = {
      currentImg: '',
      skillInput: '',
      skills: [],
      sections: sections.map(createSection),
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
    let indexOfInput = e.target.dataset.index;
    this.setState((state) => {
      let copy = JSON.parse(JSON.stringify(state.sections));
      copy[sectionNumber].input[indexOfInput] = e.target.value;
      return { sections: copy };
    });
  }

  handleExperienceAdd(sectionNumber) {
    this.setState((state) => {
      let copy = JSON.parse(JSON.stringify(state.sections));

      copy[sectionNumber].list.push({
        id: uuidv4(),
        title: state.sections[sectionNumber].input[0],
        description: state.sections[sectionNumber].input[1],
        startDate: state.sections[sectionNumber].input[2],
        endDate: state.sections[sectionNumber].input[3],
      });

      copy[sectionNumber].input = Array(NUMBER_OF_INPUTS).fill('');

      return {
        sections: copy,
      };
    });
  }

  handleExperienceDelete(e, sectionNumber) {
    let index = e.target.dataset.index;
    this.setState((state) => {
      let copy = JSON.parse(JSON.stringify(state.sections));
      copy[sectionNumber].list.splice(index, 1);
      return { sections: copy };
    });
  }

  handleExperienceFormReset(sectionNumber) {
    this.setState((state) => {
      let copy = JSON.parse(JSON.stringify(state.sections));
      copy[sectionNumber].input = Array(NUMBER_OF_INPUTS).fill('');

      return { sections: copy };
    });
  }

  render() {
    let { currentImg, skillInput, skills } = this.state;

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

        {/*Education, Experience, Projects sections*/}
        {this.state.sections.map((section, index) => {
          return (
            <ExperienceList
              key={section.id}
              name={section.title}
              inputs={section.input}
              handler={(e) => {
                handleExperienceInputs(e, index);
              }}
              onAdd={() => {
                handleExperienceAdd(index);
              }}
              onDelete={(e) => {
                handleExperienceDelete(e, index);
              }}
              onReset={() => {
                handleExperienceFormReset(index);
              }}
              list={section.list}
            />
          );
        })}
      </div>
    );
  }
}

export default Builder;
