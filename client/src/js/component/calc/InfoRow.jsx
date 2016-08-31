import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

class InfoRow extends Component {
  constructor(props) {
    super(props);
  }

          // <div className="pm-text-sm" style={{ paddingRight: '10px', height: '100%', display: 'inline-block' }}>
  render() {
    return (
      <div className="pure-u-1" style={{ position: 'relative', padding: '0 20px' }}>
        <div className="pm-g-row-1 pm-border-top">
          <div className="pm-text-sm" style={{ lineHeight: '40px', paddingRight: '10px', height: '100%', float: 'left', width: '70px' }}>
            <FormattedMessage 
              id={ this.props.label }
              defaultMessage='Title' 
              />
          </div>
          <div style={{ float: 'left', width: '70%' }}> 
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}

export default InfoRow;
