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
            currentImg={currentImg}
            defaultImg={defaultImg}
            onChange={(e) => {
              this.handleImgChange(e);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Builder;
