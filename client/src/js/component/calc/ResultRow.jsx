import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';

class ResultRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pure-u-1-4" style={{ margin: '0 auto', textAlign: 'center' }}>
        <label className="pm-text-sm color-grey-5">{ this.props.label }</label>
        <span className="pure-u-23-24 pm-text-md color-grey-6">
          { this.props.content }
        </span>
      </div>
    );
  }
}

export default ResultRow;
