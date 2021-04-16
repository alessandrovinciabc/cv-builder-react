import React from 'react';

import './Builder.css';

//Assets
import defaultImg from '../../Assets/picture-placeholder.png';

//Components
import ImagePicker from '../ImagePicker/ImagePicker.js';

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentImg: '',
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

  render() {
    let { currentImg } = this.state;

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
          />
          <button className="Skill__confirm Builder__button">Add</button>
        </div>
        <div className="Builder__education Builder__section">
          <h2>Education</h2>
          <input
            className="Builder__input Education__input"
            type="text"
            autoComplete="off"
            placeholder="Place of study"
          />
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
