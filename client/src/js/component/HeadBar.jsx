import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

const PREFIX = 'pure-',
      ACTIVE_CLASS_NAME = PREFIX + 'menu-active',
      MENU_SELECTOR = '.pure-menu-children',
      ARIA_HIDDEN = 'aria-hidden';

class HeadBar extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.onBgToggle = this.onBgToggle.bind(this);

    this.renderMenuClass = this.renderMenuClass.bind(this);
    this.renderBackdrop = this.renderBackdrop.bind(this);

    this.state = {
      showMenu: false
    }
  }

  onMenuToggle(e) {
    e.preventDefault();

    let _active = this.state.showMenu;

    this.setState({
      showMenu: !_active
    });
  }

  onBgToggle(e) {
    e.preventDefault();

    this.setState({
      showMenu: false
    });
  }

  onChange(lan) {
    let that = this;

    this.setState({
      showMenu: false
    }, () => {
      that.props.onLanguageChange(lan);
    });
  }

  renderMenuClass() {
    let _defaultCls = "pure-menu-item pure-menu-has-children pure-menu-allow-hover menu";

    if(this.state.showMenu) {
      _defaultCls += " pure-menu-active";
    }

    return _defaultCls;
  }

  renderBackdrop() {
    if(this.state.showMenu) {
      return "pm-backdrop-active";
    }
    return "pm-backdrop-hiden";
  }

  render() {
    return (
      <div className="pm-bar-head pm-text-sm bg-white">
        <div className={ this.renderBackdrop() } onClick={ this.onBgToggle } />
        <div className="pure-menu pure-menu-horizontal">
          <ul className="pure-menu-list" style={{ width: '100%' }}>
            <li className="pure-menu-item logo">
              <Link className="color-grey-6" to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
                PokemonMax
              </Link>
            </li>
            <li className={ this.renderMenuClass() }>
                <a id="menuLink1" className="pure-menu-link" ref="menuLink" onClick={ this.onMenuToggle }>
                  <FormattedMessage 
                    id="label_language"
                    description="Language"
                    defaultMessage="Language"
                    />
                </a>
                <ul className="pure-menu-children" style={{ display: this.state.showMenu? '':'none' }}>
                    <li className="pure-menu-item">
                      <a className="pure-menu-link" onClick={ this.onChange.bind(this, 'en_us') }>
                        English
                      </a>
                    </li>
                    <li className="pure-menu-item">
                      <a className="pure-menu-link" onClick={ this.onChange.bind(this, 'zh_cn') }>
                      简体中文
                      </a>
                    </li>
                    <li className="pure-menu-item">
                      <a className="pure-menu-link" onClick={ this.onChange.bind(this, 'zh_hk') } >
                      繁體中文
                      </a>
                    </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HeadBar ;
