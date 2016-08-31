import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pm-bar-footer pm-text-sm">
        <FormattedMessage
          id="about_p1"
          />
        <br />
        <span className="color-green-2">
          cauu@163.com
        </span>
        <br />
        <FormattedMessage
          id="about_p2"
          defaultMessage="Enjoy!" 
          />
        <br />
        <span>
          <FormattedMessage
            id="label_sponser"
            defaultMessage="Sponser" 
            />
        </span>
        <span style={{ marginLeft: '10px' }}>
          <a className="color-green-2" style={{ textDecoration: 'none' }} href="http://www.iufind.com">哎哟旅行</a>
        </span>
      </div>
    );
  }
}

export default Footer;
