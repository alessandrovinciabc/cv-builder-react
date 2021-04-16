import React from 'react';

import './Builder.css';

//Assets
import defaultImg from '../../Assets/picture-placeholder.png';

//Components
import ImagePicker from '../ImagePicker/ImagePicker.js';

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
          <div className="Builder__card">
            <input
              className="Builder__input Builder__input--name"
              type="text"
              placeholder="Your name"
              autoComplete="off"
            />
            <textarea
              className="Builder__input Builder__input--summary"
              placeholder="Summary"
              autoComplete="off"
            />
          </div>
          <div className="Builder__card">
            <input
              className="Builder__input"
              type="text"
              placeholder="City"
              autoComplete="off"
            />
            <input
              className="Builder__input"
              type="text"
              placeholder="Phone"
              autoComplete="off"
            />
            <input
              className="Builder__input"
              type="text"
              placeholder="Email"
              autoComplete="off"
            />
            <input
              className="Builder__input"
              type="text"
              placeholder="Linkedin"
              autoComplete="off"
            />
            <input
              className="Builder__input"
              type="text"
              placeholder="Github"
              autoComplete="off"
            />
          </div>
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
              {this.state.skills.map((skill) => {
                return <li key={skill.id}>{skill.text}</li>;
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
