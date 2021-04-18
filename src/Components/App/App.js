import React from 'react';

import './App.css';

import Header from '../Header/Header.js';
import Builder from '../Builder/Builder.js';

import { v4 as uuidv4 } from 'uuid';
const NUMBER_OF_INPUTS = 4;

class App extends React.Component {
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
      previewMode: false,
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
    let skillHandlers, sectionHandlers;

    skillHandlers = {
      input: this.handleSkillInputChange,
      add: this.handleSkillAdd,
      delete: this.handleSkillDelete,
    };

    sectionHandlers = {
      input: this.handleExperienceInputs,
      reset: this.handleExperienceFormReset,
      add: this.handleExperienceAdd,
      delete: this.handleExperienceDelete,
    };

    let handlers = {
      img: this.handleImgChange,
      skill: skillHandlers,
      section: sectionHandlers,
    };

    return (
      <div className="App">
        <Header logo="CV BUILDER" />
        <Builder
          handlers={handlers}
          currentImg={this.state.currentImg}
          skillInput={this.state.skillInput}
          skills={this.state.skills}
          sections={this.state.sections}
        />
      </div>
    );
  }
}

export default App;
