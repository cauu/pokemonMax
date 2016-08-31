import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';

import HeadBar from '../component/HeadBar.jsx';
import Footer from '../component/Footer.jsx';

import zhLocaleData from 'react-intl/locale-data/zh';
import enLocaleData from 'react-intl/locale-data/en';

import zh_cn from '../locale/zh_cn.js';
import en_us from '../locale/en_us.js';
import zh_hk from '../locale/zh_hk.js';

import intl from 'intl';

import { changeLanguage } from '../action/Language.js';

let defaultLocale = "zh_cn";

if(typeof window !== 'undefined'){
  let _sysLoc = (navigator.language || navigator.browserLanguage).toLowerCase();
  console.log('system locale is', _sysLoc);

  if( _sysLoc === 'zh-cn') {
    defaultLocale = 'zh_cn';
  }
  else if( _sysLoc === 'zh-tw') {
    defaultLocale = 'zh_hk';
  }
  else {
    defaultLocale = 'en_us';
  }
}

addLocaleData(enLocaleData);
addLocaleData(zhLocaleData);

class App extends Component {
  constructor(props) {
    super(props);

    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.renderLocaleMsg = this.renderLocaleMsg.bind(this);
  }

  componentDidMount() {
    this.props.changeLanguage(defaultLocale);
  }

  onLanguageChange(language) {
    this.props.changeLanguage(language);
  }

  renderLocaleMsg() {
    switch(this.props.language) {
      case 'en_us': 
        return en_us;
      case 'zh_cn':
        return zh_cn;
      case 'zh_hk':
        return zh_hk;
      default:
        return en_us;
    }
  }

  render() {
    return (
      <div className="bg-grey-1">
        <IntlProvider locale='en' messages={ this.renderLocaleMsg() } >
          <HeadBar onLanguageChange={ this.onLanguageChange } />
        </IntlProvider>
        <IntlProvider locale='en' messages={ this.renderLocaleMsg() } >
          { this.props.children }
        </IntlProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.language
  };
}

export { App };
export default connect(mapStateToProps, { changeLanguage })(App);
