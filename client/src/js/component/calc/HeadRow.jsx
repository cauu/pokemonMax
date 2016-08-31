import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import StarDustModal from '../StarDustModal.jsx';

class HeadRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _img = this.props.img,
      _name = this.props.name,
      _cls = "pm-card-head pure-u-1 gradient-" + this.props.attribute || "normal";


    return (
      <div className={ _cls }>
        <div className="head">
          <div className={`pm-btn-head bg-white shadow-${this.props.attribute}`} style={{ backgroundImage: `url('${_img}')` }} />
        </div>
        <div className="name pm-text-lg color-white">
          <FormattedMessage 
            id={ _name }
            description="Pokemon's name"
            defaultMessage={ _name }
            />
        </div>
        <div className="sub pm-text-sm color-white">
          { _name }
        </div>
      </div>
    );
  }
}

export default HeadRow;
