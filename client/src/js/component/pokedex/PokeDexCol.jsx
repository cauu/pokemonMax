import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';

import PokeDexItem from './PokeDexItem.jsx';

class PokeDexCol extends Component {
  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems() {
    let _pms = this.props.pokemons;
    let _components = [];

    _pms.forEach((p, i) => {
      _components.push(
        <PokeDexItem
          pokemon={ p }
          />
      );
    });

    return _components;
  }

  render() {
    return (
      <div style={{ margin: '10px auto' }} className="pure-u-1 pure-u-lg-5-12 pm-g-dex-col">
        { this.renderItems() }
      </div>
    );
  }
}

PokeDexCol.propTypes = {
  pokemons: PropTypes.instanceOf(List).isRequired,
}

export default PokeDexCol;
