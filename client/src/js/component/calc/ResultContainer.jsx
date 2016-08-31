import React, { Component, PropTypes } from 'react';
import Immutable, { List, Map } from 'immutable';
import { Link } from 'react-router';
import { Circle } from 'rc-progress';
import { FormattedMessage } from 'react-intl';

import ResultRow from './ResultRow.jsx';
import PerfectionRow from './PerfectionRow.jsx';
import HeadRow from './HeadRow.jsx';
import { assembleModelUrl } from '../../utils';
import InfoRow from './InfoRow.jsx';

class ResultContainer extends Component {
  constructor(props) {
    super(props);

    this.renderStats = this.renderStats.bind(this);
    this.renderHint = this.renderHint.bind(this);
  }

  componentDidMount() {
  }

  _getWorstResult(stats, times) {
    let _index = 0;
    let _min = stats.get('0').get('perfection');

    stats.forEach((s, i) => {
      if(s.get('perfection') < _min && s.get('times') >= times) {
        _min = s.get('perfection');
        _index = i;
      }
    });

    // return _index;
    return stats.get(_index);
  }

  _getBestResult(stats, times) {
    let _index = 0;
    let _max = stats.get('0').get('perfection');

    stats.forEach((s, i) => {
      if(s.get('perfection') > _max && s.get('times') >= times) {
        _max = s.get('perfection');
        _index = i;
      }
    });

    // return _index;
    return stats.get(_index);
  }

  _getMostlyResult(stats) {
    let _index = 0;
    let _max = stats.get('0').get('times');

    stats.forEach((s, i) => {
      if(s.get('times') > _max) {
        _max = s.get('times');
        _index = i;
      }
    });

    return stats.get(_index);
  }

  renderHint(name, perfection) {
    return '';
    // if(perfection === 100) {
    //   return `两个字:完美！`;
    // }
    // if(perfection < 70) {
    //   return `恭喜你获得4个${name}星尘`;
    // }
    // else if(perfection > 90) {
    //   return `恭喜你!非常棒的${name}`;
    // }
    // else if(perfection > 70 && perfection < 80) {
    //   return `一只平庸的${name}`;
    // }
    // else {
    //   return `唔，资质还不错的${name}`;
    // }
  }

  renderStats(name, attr, type) {
    let _stats = this.props.value || Immutable.fromJS([]);
    let _components = [];
    let _form = [];

    // let _mostlyResultIndex,
    //   _maxResultIndex;
    let _mostlyResult;
    //   _maxResult,
    //   _minResult,
    let s,
      _total = 0,
      _label = "label_title_result";

    if(!_stats.isEmpty()) {

      _mostlyResult = this._getMostlyResult(_stats);

      _stats.forEach((p) => {
        if(p.get('times') === _mostlyResult.get('times')) {
          _total ++;
        }
      });

      if(type === 'mostly') {
        s = _mostlyResult;
      }
      else if( type === 'best' ) {
        s = this._getBestResult(_stats, _mostlyResult.get('times'));
        _label = "label_best_case";
      }
      else if( type === 'worst') {
        s = this._getWorstResult(_stats, _mostlyResult.get('times'));
        _label = "label_worst_case";
      }

      _form.push(
        <PerfectionRow 
          attribute={ attr }
          percent={ s.get('perfection') }
          />
      );

      _form.push(<ResultRow 
                   content={ s.get('dura') } 
                   label={ 
                     <FormattedMessage 
                       id="label_hp_ratio"
                       description="Hp ratio"
                       defaultMessage="Hp Ratio"
                     /> } 
                />
                );
      _form.push(<ResultRow 
                   content={ s.get('off') } 
                   label={ 
                     <FormattedMessage 
                       id="label_attack_ratio"
                       description="Attack ratio"
                       defaultMessage="Attack Ratio"
                     /> } 
                   />);
      _form.push(<ResultRow 
                   content={ s.get('def') } 
                   label={ 
                     <FormattedMessage 
                       id="label_def_ratio"
                       description="Defense ratio"
                       defaultMessage="Defense Ratio"
                     /> } 
                   />);
      _form.push(<ResultRow 
                   content={ s.get('individual') } 
                   label={ 
                     <FormattedMessage 
                       id="label_overall_ratio"
                       description="Overall ratio"
                       defaultMessage="Overall Ratio"
                     /> } 
                   />);
    }

    _components.push(
      <legend className="pm-text-md">
        <FormattedMessage
          id={ _label }
          values={{
            total: _total
          }}
          />
      </legend>
    );

    _components.push(
      <div className="pure-g" style={{ marginBottom: '10px' }}>
        { _form }
      </div>
    );

    return _components;
  }

  render() {
    let _pm = this.props.pokemon;
    let _stats = this.props.value;
    let _img = "", 
      name = "bulbasaur", 
      nameZh = "",
      _attr = "normal";

    if(!_pm.isEmpty()) {
      _img = assembleModelUrl(_pm.get('id'), 200, 200);
      name = _pm.get('name');
      nameZh = _pm.get('nameZh');
      _attr = _pm.get('attributes').get(0);
    }

    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeadRow name={ name } img={ _img } attribute={ _attr } />
        <div className="pure-form pure-form-stacked" style={{ padding: '0 20px' }}>
          <fieldset>
            { this.renderStats(nameZh, _attr, 'mostly') }
            { this.renderStats(nameZh, _attr, 'best') }
            { this.renderStats(nameZh, _attr, 'worst') }
          </fieldset>
        </div>
        <div className="pure-g" style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }} className="pure-u-1-2">
            <a className={ `pure-button pm-btn-primary bg-${_attr} color-white` } onClick={ this.props.onReset }>
              <FormattedMessage
                id="btn_recalc"
                description="Recalculation"
                defaultMessage="Recalculation"
                />
            </a>
          </div>
          <div style={{ textAlign: 'center' }} className="pure-u-1-2">
            <a href="/" className={ `pure-button pm-btn-primary bg-${_attr} color-white` }>
              <FormattedMessage
                id="btn_change_mon"
                description="Change Pokemon"
                defaultMessage="Reselect"
                />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ResultContainer.propTypes = {
  pokemon: PropTypes.instanceOf(Map).isRequired,
  value: PropTypes.instanceOf(List).isRequired
}

export default ResultContainer;
