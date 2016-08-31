import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { Circle } from 'rc-progress';
import Color from '../../constant/Color.js';

class PerfectionRow extends Component {
  constructor(props) {
    super(props);

    this.style={
      label: {
        position: 'absolute',
        top: '75px',
        width: '100%',
        textAlign: 'center'
      },
      circle: {
        width: '200px',
        margin: '0 auto'
      }
    };
  }

  render() {
    return (
      <div className="pure-u-1" style={{ marginTop: '10px', marginBottom: '10px', position: 'relative' }}>
        <div style={ this.style.circle }>
          <Circle percent={ this.props.percent || 0 } strokeWidth="10" strokeColor={ Color[this.props.attribute] } trailColor={ Color['default'] } />
        </div>
        <div className="pm-text-md" style={ this.style.label }>
          <FormattedMessage
            id="label_perfection"
            description="Perfection"
            defaultMessage="Perfection"
            />
          <br />
          { Math.round(this.props.percent) + '%' || 0 }
        </div>
      </div>
    );
  }
}

export default PerfectionRow;
