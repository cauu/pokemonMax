import React, { Component, PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import InputForm from './InputForm.jsx';
import InfoForm from './InfoForm.jsx';
import InfoRow from './InfoRow.jsx';
import StarDustModal from '../StarDustModal.jsx';

import { assembleModelUrl } from '../../utils';

class CalcContainer extends Component {
  constructor(props) {
    super(props);

    this.onFormAdd = this.onFormAdd.bind(this);
    this.onFormRemove = this.onFormRemove.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.onHelpShow = this.onHelpShow.bind(this);
    this.onHelpClose = this.onHelpClose.bind(this);

    this.renderForms = this.renderForms.bind(this);

    this.state = {
      showHelp: false
    };
  }

  onHelpShow() {
    this.setState({
      showHelp: true
    });
  }

  onHelpClose() {
    this.setState({
      showHelp: false
    });
  }

  onFormAdd() {
    this.props.onAdd();
  }

  onFormRemove(index) {
    this.props.onRemove(index);
  }

  renderForms() {
    let _components = [];

    for(let i = 0; i < this.props.values.length; i++) {
      _components.push(
        <InputForm 
          index={ i } 
          onChange={ this.onInputChange } 
          value={ 
            this.props.values[i] || { cp: '', hp: '', level: '' }
          } 
          onDelete={ this.onFormRemove }
          />
      );
    }

    return _components;
  }

  onInputChange(index, value) {
    this.props.onChange(index, value);
  }

  render() {
    let _pm = this.props.pokemon;
    let _img = "", 
      name = "bulbasaur", 
      nameZh = "",
      _attr = "normal";

    if(!_pm.isEmpty()) {
      // _img = _pm.get('imgs').get('frontDefault');
      _img = assembleModelUrl(_pm.get('id'), 200, 200);
      name = _pm.get('name');
      nameZh = _pm.get('nameZh');
      _attr = _pm.get('attributes').get(0);
    }

    return (
      <div>
        <InfoForm pokemon={ _pm } />
        <div className="bg-grey-1" style={{ height: '10px' }} />
        <div className="pure-g">
          <div className="pure-u-1" style={{ position: 'relative', padding: '0 20px' }}>
            <div className="pm-g-row-1">
              <div className="pm-text-sm" style={{ lineHeight: '40px', paddingRight: '10px', height: '100%', float: 'left', width: '70px' }}>
                <FormattedMessage
                  id="label_perfection"
                  description="perfection"
                  />
              </div>
              <div style={{ float: 'left', width: '70%' }}> 
                <span className="pm-text-xs color-grey-4" style={{ height: '40px', lineHeight: '40px', textDecoration: 'underline', float: 'right' }} onClick={ this.onHelpShow }>
                  <FormattedMessage
                    id="label_how_to_calc"
                    description="how to calc level"
                    />
                </span>
              </div>
            </div>
          </div>
        </div>
        { this.renderForms() }
        <div className="pure-g" style={{ textAlign: 'center' }}>
          <div className="pm-g-row-2" style={{ width: '100%' }}>
            <a className="iconfont pure-u-7-8 pm-btn-form-add pm-text-md" onClick={ this.onFormAdd }>
              &#xe61b;
            </a>
          </div>
        </div>
        <div style={{ padding: '5px 20px', height: '20px', lineHeight: '15px' }} className="bg-grey-1 pm-text-xs color-grey-4">
          <FormattedMessage
            id="label_tip_iv"
            defaultMessage="Input more data"
            />
        </div>
        <div className="bg-grey-1" style={{ width: '100%', textAlign: 'center', paddingTop: '35px', paddingBottom: '35px' }}>
          <div className={ `iconfont pm-text-xxl bg-${_attr} pm-btn-round-lg` } onClick={ this.props.onCalcClick }>
            &#xe61c;
          </div>
        </div>
        <StarDustModal isOpen={ this.state.showHelp } onClose={ this.onHelpClose } />
      </div>
    );
  }
}

CalcContainer.propTypes = {
  pokemon: PropTypes.instanceOf(Map).isRequired,
}

export default CalcContainer;
