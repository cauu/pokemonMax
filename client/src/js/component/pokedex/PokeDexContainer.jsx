import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';

import PokeDexRow from './PokeDexRow.jsx';

const rowSize = 10;

class PokeDexContainer extends Component {
  constructor(props) {
    super(props);
  }

  renderRows() {
    let _pms = this.props.pokemons; 

    let _components = [];

    for(let i = 0; i < _pms.size;) {
      _components.push(
        <PokeDexRow
          pokemons={ _pms.slice(i, i+rowSize) }
          />
      );
      i += rowSize;
    }

    return _components;
  }

  render() {
    return (
      <div>
        { this.renderRows() }
      </div>
    );
  }
}

PokeDexContainer.propTypes = {
  pokemons: PropTypes.instanceOf(List).isRequired,
}

export default PokeDexContainer;
