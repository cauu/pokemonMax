import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import moment from 'moment';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import Header from '../component/HeadBar.jsx';
import Footer from '../component/Footer.jsx';

import config from '../config';
import configureStore from '../store/configureStore';

import { loadPokemonDetail, calcPokemonStats, resetPokemonStats } from '../action/Pokemon.js';
import { resetError } from '../action/Error.js';

import CalcContainer from '../component/calc/CalcContainer.jsx';
import ResultContainer from '../component/calc/ResultContainer.jsx';

class PokemonCalc extends React.Component {
  static fetchData({ store, params }) {
    let { id } = params;

    return store.dispatch(loadPokemonDetail({ id: id }));
  }

  constructor(props) {
    super(props);

    this.onCalcClick = this.onCalcClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onFormAdd = this.onFormAdd.bind(this);
    this.onFormRemove = this.onFormRemove.bind(this);
    this.onFormClear = this.onFormClear.bind(this);

    this.state = {
      input: [{
        cp: "",
        hp: "", 
        // level: "" 
        stardust: ""
      }]
    };

    this.alertMsg = defineMessages({
      alertFormEmpty: {
        id: 'alert_fill_form',
        defaultMessage: 'Form is empty'
      },
      alertCalcErr: {
        id: 'alert_calc_error',
        defaultMessage: 'Calculation Failed!'
      }
    });
  }

  componentDidMount() {
    this.props.loadPokemonDetail({
      id: this.props.params.id
    });
  }

  componentWillUnmount() {
    this.props.resetPokemonStats();
  }

  onInputChange(index, { level, cp, hp, stardust }) {
    let _input = this.state.input;

    if(!_input[index]) {
      _input[index] = {};
    }

    if(level !== undefined) {
      _input[index].level = level;
    }
    if(stardust !== undefined) {
      _input[index].stardust = stardust;
    }
    if(cp !== undefined) {
      _input[index].cp = cp;
    }
    if(hp !== undefined) {
      _input[index].hp = hp;
    }

    this.setState({
      input: _input
    });
  }

  onCalcClick() {
    let { formatMessage } = this.props.intl;
    let _input = this.state.input;
    let _id = this.props.params.id;
    let _msg = formatMessage(this.alertMsg.alertFormEmpty);

    for(let i in _input) {
      for(let k in _input[i]) {
        if(!_input[i][k]) {
          alert(_msg);
          return ;
        }
      }
      _input[i].number = _id;
    }

    this.props.calcPokemonStats(_input);
  }

  onReset() {
    this.props.resetPokemonStats();
  }

  onFormRemove(index) {
    let _input = this.state.input;

    _input.splice(index, 1);

    this.setState({
      input: _input
    });
  }

  onFormAdd() {
    let _input = this.state.input;

    _input.push({
      stardust: '',
      // level: '',
      cp: '',
      hp: ''
    });

    this.setState({
      input: _input
    });
  }

  onFormClear() {
    let _input = [
      {
        level: '',
        cp: '',
        hp: ''
      }
    ];

    this.setState({
      input: _input
    });
  }

  render() {
    let _showResult = !this.props.stats.isEmpty();

    if(this.props.error !== '') {
      let { formatMessage } = this.props.intl;
      let _msg = formatMessage(this.alertMsg.alertCalcErr);
      alert(_msg);
      this.props.resetError();
    }
     
    return (
      <div className="pm-main-container bg-white">
        <div style={{ display: _showResult?'none': 'block' }}>
          <CalcContainer 
            values={ this.state.input } 
            pokemon={ this.props.pokemon } 
            onChange={ this.onInputChange } 
            onAdd={ this.onFormAdd } 
            onRemove={ this.onFormRemove } 
            onClear={ this.onFormClear }
            onCalcClick={ this.onCalcClick }
            />
        </div>
        <div style={{ display: _showResult?'block': 'none' }}>
          <ResultContainer 
            value={ this.props.stats } 
            pokemon={ this.props.pokemon } 
            onReset={ this.onReset }
            />
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    pokemon: state.pokemon.get('detail'),
    stats: state.pokemon.get('stats'),
    error: state.error.get('text'),
    language: state.language
  };
}

const wrappedPokemonClac = injectIntl(PokemonCalc);
export { wrappedPokemonClac as PokemonCalc };
export default connect(mapStateToProps, { loadPokemonDetail, calcPokemonStats, resetPokemonStats, resetError })(injectIntl(PokemonCalc));
