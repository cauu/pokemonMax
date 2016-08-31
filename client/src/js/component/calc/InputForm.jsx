import React, { Component, PropTypes } from 'react';
import Immutable, { List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

class InputForm extends Component {
  constructor(props) {
    super(props);

    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onLvChange = this.onLvChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onCPChange(e) {
    this.props.onChange(this.props.index, { cp: e.target.value });
  }

  onHPChange(e) {
    this.props.onChange(this.props.index, { hp: e.target.value });
  }

  onLvChange(e) {
    this.props.onChange(this.props.index, { level: e.target.value });
  }

  onDustChange(e) {
    this.props.onChange(this.props.index, { stardust: e.target.value });
  }

  onDelete(e) {
    e.preventDefault();

    this.props.onDelete(this.props.index);
  }

                // <span className="color-green-2 pm-text-xs" style={{ textDecoration: 'underline', marginLeft: '5px' }} onClick={ this.onHelpShow }>
                //   <FormattedMessage
                //     id="label_how_to_calc"
                //     description="How to calculate level?"
                //     defaultMessage="What is level?"
                //     />
                // </span>
  render() {
    // let { level, cp, hp, stardust } = this.props.value;
    let { cp, hp, stardust } = this.props.value;

    return (
        <form className="pure-form pure-form-stacked">
          <fieldset>
            <div className="pure-g pm-g-row-2" style={{ padding: '0 20px', paddingRight: '0px' }}>
              <div className="pure-u-7-24" style={{ margin: '0 auto', textAlign: 'center' }}>
                <span className="pm-text-sm color-grey-5">
                  <FormattedMessage
                    id="label_stardust"
                    description="Stardust"
                    defaultMessage="Stardust"
                    />
                  <input style={{ display: 'inline-block', marginLeft: '5px', width: '60%' }} value={ stardust} className="pm-input-number" type="number" onChange={ this.onDustChange } />
                </span>
              </div>

              <div className="pure-u-7-24" style={{ margin: '0 auto', textAlign: 'center' }}>
                <span className="pm-text-sm color-grey-5" style={{ paddingRight: '5px' }}>
                  <FormattedMessage
                    id="label_cp"
                    description="CP"
                    defaultMessage="CP"
                    />
                  <input style={{ display: 'inline-block', marginLeft: '5px', width: '60%' }} value={ cp } className="pm-input-number" type="number" onChange={ this.onCPChange } />
                </span>
              </div>

              <div className="pure-u-7-24" style={{ margin: '0 auto', textAlign: 'center' }}>
                <span className="pm-text-sm color-grey-5" style={{ paddingRight: '5px' }}>
                  <FormattedMessage
                    id="label_hp"
                    description="HP"
                    defaultMessage="HP"
                    />
                  <input style={{ display: 'inline-block', marginLeft: '5px', width: '60%' }} value={ hp } className="pm-input-number" type="number" onChange={ this.onHPChange } />
                </span>
              </div>

              <div className="pure-u-1-8" style={{ margin: '0 auto', textAlign: 'center'  }}>
                <a style={{ display: this.props.index > 0? 'inline-block': 'none' }} 
                  className="iconfont pm-btn-form-del pm-text-sm" 
                  onClick={ this.onDelete }>
                  &#xe61a;
                </a>
              </div>
            </div>
          </fieldset>
          <div style={{ height: '5px' }} className="bg-grey-1" />
        </form>
    );
  }
}

export default InputForm;
