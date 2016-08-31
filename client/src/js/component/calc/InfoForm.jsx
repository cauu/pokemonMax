import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { assembleModelUrl } from '../../utils';
import ICONS from '../../constant/Icon.js';

import InfoRow from './InfoRow.jsx';
import HeadRow from './HeadRow.jsx';

const TOTAL_RANK = 76;

class InfoForm extends Component {
  constructor(props) {
    super(props);

    this.renderSkill = this.renderSkill.bind(this);
    this.renderTier = this.renderTier.bind(this);
    this.renderRankShadow = this.renderRankShadow.bind(this);
    this.renderAttributes = this.renderAttributes.bind(this);

    this.state = {
      rankShadow: 100
    }
  }

  componentDidMount() {
  }

  renderAttributes(attributes) {
    let _components = [];

    attributes.forEach((a) => {
      _components.push(
        <div 
          className="pm-text-sm" 
          style={{ display: 'inline-block', marginLeft: '2.5px', marginRight: '2.5px' }}>
          <i
            className={ `iconfont color-${a}` }
            dangerouslySetInnerHTML={{ __html: ICONS['attr_' + a] }}>
          </i>
          <div className={ `color-${a}` } style={{ padding: '0' }}>
            <FormattedMessage
              id={ a }
              description="attribute's name"
              defaultMessage="normal"
              />
          </div>
        </div>
      );
    });

    return _components;
  }

  renderTier(level) {
    let _components = [];
    let _stars = 0;
    switch(level) {
      case 'C': 
        _stars = 1;
        break;
      case 'B': 
        _stars = 2;
        break;
      case 'A': 
        _stars = 3;
        break;
      case 'S': 
        _stars = 4;
        break;
      case 'SS':
        _stars = 5;
        break;
      case 'SSS': 
        _stars = 6;
        break;
      default: 
        break;
    }

    let _total = _stars > 5?_stars: 5;
    for(let i = 0; i < _total; i++) {
      if(i < _stars) {
        _components.push(
          <span className='color-yellow-1 pm-text-md iconfont' style={{ margin:'0 5px' }}>&#xe618;</span>
        );
      }
      else {
        _components.push(
          <span style={{ margin: '0 5px' }} className='color-yellow-1 iconfont pm-text-md'>&#xe619;</span>
        );
      }
    }

    return _components;
  }

  renderSkill(type) {
    let _pm = this.props.pokemon,
      _skill = Immutable.fromJS([]),
      _components = [];

    if(!_pm.isEmpty()) {
      _skill = _pm.get(type);
    }

    _skill.forEach((s, i) => {
      let _btnCls;
      if(s.get('recommend')) {
        _btnCls = `bg-${s.get('attribute')} border-${s.get('attribute')} color-white pm-btn-skill`;
      }
      else {
        _btnCls = `bg-white color-${s.get('attribute')} border-${s.get('attribute')} pm-btn-skill `;
      }

      _components.push(
        <div className={ _btnCls } style={{ margin: '0 2.5px' }}>
          <span style={{ marginRight:'2px' }} className="iconfont pm-text-sm" dangerouslySetInnerHTML={{ __html: ICONS['attr_' + s.get('attribute')] }} />
          <span className="pm-text-sm">
            <FormattedMessage
              id={ s.get('name') }
              description="Skill name"
              defaultMessage="Skill name"
              />
          </span>
        </div>
      );
    });

    return _components;
  }

  renderRankShadow() {
    let _pm = this.props.pokemon;
    let _rank = TOTAL_RANK + 1;

    if(!_pm.isEmpty() && _pm.get('rank') !== '-') {
      _rank = _pm.get('rank');
    }

    let _shadowWidth = (_rank - 1)/TOTAL_RANK*100;

    return (
      <div className="content" ref="rankShadow" style={{ width: `${_shadowWidth}%` }}/>
    );
  }

  render() {
    let _pm = this.props.pokemon;
    let _img = "", 
      name = "bulbasaur", 
      nameZh = "",
      hpTier = 0,
      cpTier = 0,
      _attribute = "",
      _overallRank = 0,
      _attributes = Immutable.fromJS([]);
    

    if(!_pm.isEmpty()) {
      // _img = _pm.get('imgs').get('frontDefault');
      _img = assembleModelUrl(_pm.get('id'), 200, 200);
      name = _pm.get('name');
      nameZh = _pm.get('nameZh');
      hpTier = _pm.get('hpTier');
      cpTier = _pm.get('cpTier');
      _attribute = _pm.get('attributes').get(0);
      _overallRank = _pm.get('rank');
      _attributes = _pm.get('attributes');
    }

    return (
      <div className="pure-g">
        <HeadRow name={ name } img={ _img } attribute={ _attribute }/>
        <div className="pm-g-row-2 pure-u-1" style={{ paddingTop: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            { this.renderAttributes(_attributes) }
          </div>
        </div>
        <InfoRow label="label_cp_lv">
          { this.renderTier(cpTier) }
        </InfoRow>
        <InfoRow label="label_hp_lv">
          { this.renderTier(hpTier) }
        </InfoRow>
        <InfoRow label="label_rank">
          <div className={ `pm-bar-loading gradient-${_attribute}`   } ref="rank">
            { this.renderRankShadow() }
          </div>
          <span className="pm-text-xs" style={{ marginLeft: '5px' }}>
            { `${_overallRank}/${TOTAL_RANK}` }
          </span>
        </InfoRow>
        <InfoRow label="label_base">
          { this.renderSkill('base') }
        </InfoRow>
        <InfoRow label="label_special">
          { this.renderSkill('special') }
        </InfoRow>
        <div className="pure-u-1" style={{ position: 'relative', padding: '0 20px' }}>
          <div className="pm-g-row-1 pm-border-top">
            <div className="pm-text-xs color-grey-4" style={{ lineHeight: '40px', paddingRight: '10px', height: '100%', float: 'left' }}>
              <FormattedMessage
                id="label_tip_skill"
                defaultMessage="Recommend filled skills."
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoForm;
