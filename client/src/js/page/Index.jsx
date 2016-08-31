import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import moment from 'moment';

import Header from '../component/HeadBar.jsx';
import Footer from '../component/Footer.jsx';

import config from '../config';
import configureStore from '../store/configureStore';

import PokeDexContainer from '../component/pokedex/PokeDexContainer.jsx';

import { loadPokemons } from '../action/Pokemon.js';

class Index extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(loadPokemons());
  }

  constructor(props) {
    super(props);

    this.renderDex = this.renderDex.bind(this);
  }

  componentDidMount() {
    if(this.props.pokemons.size === 0) {
      this.props.loadPokemons();
    }
  }

  renderDex() {
    let _pms = this.props.pokemons || Immutable.fromJS([]);
    let _components = [];

    _pms.forEach((p) => {
      _components.push(
        <button className="pure-button pure-button-primary">
          { p.get('nameZh') }
        </button>
      );
    });

    return _components;
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="pm-main-container bg-white">
        <PokeDexContainer pokemons={ this.props.pokemons } />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    pokemons: state.pokemon.get('list'),
    language: state.language
  };
}

export { Index };
export default connect(mapStateToProps, { loadPokemons })(Index);
