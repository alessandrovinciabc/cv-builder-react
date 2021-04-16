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
            />
            <textarea
              className="Builder__input Builder__input--summary"
              placeholder="Summary"
            />
          </div>
          <div className="Builder__card">
            <input className="Builder__input" type="text" placeholder="City" />
            <input className="Builder__input" type="text" placeholder="Phone" />
            <input className="Builder__input" type="text" placeholder="Email" />
            <input
              className="Builder__input"
              type="text"
              placeholder="Linkedin"
            />
            <input
              className="Builder__input"
              type="text"
              placeholder="Github"
            />
          </div>
        </div>
        <div className="Builder__skills">
          <h2>Skills</h2>
          <input className="Builder__input Skill__input" type="text" />
          <button className="Skill__confirm">Add new skill</button>
        </div>
      </div>
    );
  }
}

export default Builder;
