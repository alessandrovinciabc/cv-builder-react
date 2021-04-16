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

    const DEFAULT_SECTIONS = ['Education', 'Experience', 'Personal Projects'];

    let sectionObjects = DEFAULT_SECTIONS.map((title) => {
      return {
        id: uuidv4(),
        title: title,
        list: [],
      };
    });

    this.state = {
      currentImg: '',
      skillInput: '',
      skills: [],
      sections: sectionObjects,
    };
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

  render() {
    let { currentImg, skillInput } = this.state;

    return (
      <div className="Builder">
        <div className="Builder__info">
          <ImagePicker
            className="Builder__card"
            currentImg={currentImg}
            defaultImg={defaultImg}
            onChange={(e) => {
              this.handleImgChange(e);
            }}
          />
          <InfoInput />
        </div>
        <SkillList
          input={skillInput}
          list={this.state.skills}
          handleChange={(e) => {
            this.handleSkillInputChange(e);
          }}
          handleAdd={() => {
            this.handleSkillAdd();
          }}
          handleDelete={(index) => {
            this.handleSkillDelete(index);
          }}
        />
        {this.state.sections.map((section) => {
          return <ExperienceList name={section.title} key={section.id} />;
        })}
      </div>
    );
  }
}

export default Builder;
