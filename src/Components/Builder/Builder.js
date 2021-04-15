import React from 'react';

import './Builder.css';

import defaultImg from '../../Assets/picture-placeholder.png';

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
          <div className="Builder__picture-display">
            <img
              src={currentImg || defaultImg}
              className="Builder__picture"
              alt=""
            />
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              this.handleImgChange(e);
            }}
          ></input>
        </div>
      </div>
    );
  }
}

export default Builder;
