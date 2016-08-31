import React, { Component, PropTypes } from 'react';
import Immutable, { Map, List } from 'immutable';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import { assembleModelUrl } from '../../utils';

class PokeDexItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let _pm = this.props.pokemon;
    let img = _pm.get('imgs').get('frontDefault');
    let link = '/calc/' + _pm.get('id');
    let name = _pm.get('name');
    let number = _pm.get('id');
    let url = assembleModelUrl(number, 80, 80);

            // <div className="content" style={{ backgroundImage: `url('${url}')` }}>
    return (
      <Link className="pm-btn-square" to={ link } style={{ textDecoration: 'none' }}>
        <div style={{ height: '50px' }}>
          <div className="pm-btn-round" style={{ margin: '0 auto' }}>
            <div className="content" style={{ backgroundImage: `url('${url}')` }} />
          </div>
        </div>
        <div className="pm-text-xs color-grey-6" style={{ height: '15px', lineHeight: '15px' }}>
          <FormattedMessage 
            id={ name }
            description="Pokemon's name"
            defaultMessage={ name }
            />
        </div>
      </Link>
    );
  }
}

PokeDexItem.propTypes = {
  pokemon: PropTypes.instanceOf(Map).isRequired,
}
export default PokeDexItem;
