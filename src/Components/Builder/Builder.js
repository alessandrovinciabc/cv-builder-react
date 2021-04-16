import React from 'react';

import './Builder.css';

//Assets
import defaultImg from '../../Assets/picture-placeholder.png';

//Components
import ImagePicker from '../ImagePicker/ImagePicker.js';
import InfoInput from '../InfoInput/InfoInput.js';

import { v4 as uuidv4 } from 'uuid';

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImg: '',
      skillInput: '',
      skills: [],
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
        <div className="Builder__skills Builder__section">
          <h2>Skills</h2>
          <input
            className="Builder__input Skill__input"
            type="text"
            autoComplete="off"
            value={skillInput}
            onChange={(e) => {
              this.handleSkillInputChange(e);
            }}
          />
          <button
            className="Skill__confirm Builder__button"
            onClick={() => {
              this.handleSkillAdd();
            }}
          >
            Add
          </button>
          <div className="Skill_list">
            <ul>
              {this.state.skills.map((skill, index) => {
                return (
                  <li className="Skill" key={skill.id}>
                    {skill.text}{' '}
                    <button
                      className="Button--delete"
                      onClick={() => {
                        this.handleSkillDelete(index);
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
        <div className="Builder__education Builder__section">
          <h2>Education</h2>
          <input
            className="Builder__input Education__input"
            type="text"
            autoComplete="off"
            placeholder="Degree"
          />
          <textarea
            className="Builder__input Builder__input--summary Education__input"
            placeholder="Description"
            autoComplete="off"
          />
          <label>
            Start date:
            <input
              className="Builder__input Education__input"
              type="date"
              autoComplete="off"
            />
          </label>
          <label>
            End date:
            <input
              className="Builder__input Education__input"
              type="date"
              autoComplete="off"
            />
          </label>
          <div>
            <button className="Builder__button">Add</button>
            <button className="Builder__button">Reset</button>
          </div>
        </div>
        <div className="Builder__experience Builder__section">
          <h2>Experience</h2>
        </div>
        <div className="Builder__projects Builder__section">
          <h2>Personal Projects</h2>
        </div>
      </div>
    );
  }
}

export default Builder;
