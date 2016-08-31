import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';

import PokeDexCol from './PokeDexCol.jsx';

const colSize = 5;

class PokeDexRow extends Component {
  constructor(props) {
    super(props);

    this.renderCols = this.renderCols.bind(this);
  }

  renderCols() {
    let _pms = this.props.pokemons;
    let _components = [];

    _components.push(
      <PokeDexCol 
        pokemons={ _pms.slice(0, colSize) }
        />
    );

    if(_pms.size > colSize) {
      _components.push(
        <PokeDexCol
          pokemons={ _pms.slice(colSize) }
          />
      );
    }

    return _components;
  }

  render() {
    return (
      <div className="pure-g" style={{ width: '100%' }}>
        { this.renderCols() }
      </div>
    );
  }
}

PokeDexRow.propTypes = {
  pokemons: PropTypes.instanceOf(List).isRequired,
}

export default PokeDexRow;
