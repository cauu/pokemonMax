import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { FormattedMessage } from 'react-intl';

import starDust from '../constant/StarDust.js';

class StarDustModal extends React.Component {
  constructor(props) {
    super(props);

    this.closeModal = this.closeModal.bind(this);

    this.renderContent = this.renderContent.bind(this);

    this.style = {
      overlay: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: "1",
        backgroundColor: 'rgba(0, 0 ,0 , 0.75)'
      },
      content: {
        top: '10%',
        left: '15%',
        right: '15%',
        bottom: '15%',
        padding: '10px'
      }
    }
  }

  closeModal() {
    this.props.onClose();
  }

  renderContent() {
    let _components = [];
    let _index = 0;

    for(let i in starDust) {
      let _cls = "pm-text-sm color-grey-6";
      if( _index%2 === 0) {
        _cls += " pure-table-odd";
      }
      _components.push(
        <tr className={ _cls } style={{ textAlign: 'center' }}>
          <td>
            <img style={{ height: '15px', marginRight: '5px' }} src="http://7xli5t.com1.z0.glb.clouddn.com/pokemon%2FSTARDUST.png" />
            { i }
          </td>
          <td>
            { starDust[i].min + '-' + starDust[i].max }
          </td>
          <td>
            { starDust[i].candies }
          </td>
        </tr>
      );
      _index++;
    }

    return _components;
  }

  render() {
    return (
      <Modal
        isOpen={ this.props.isOpen }
        style={ this.style }
        onRequestClose={ this.closeModal }
      >
        <div style={{ width:'100%', textAlign: 'left' }}>
          <div className="pm-text-sm" style={{ textAlign: 'center', height: '40px', lineHeight: '40px' }}>
            <FormattedMessage 
              id="instruction_title"
              description="StarDust and level"
              defaultMessage=""
              />
          </div>
          <table className="pure-table pure-table-horizontal" style={{ width: '100%', margin: '0 auto' }}>
            <thead>
              <tr className="pm-text-md" style={{ textAlign: 'center' }}>
                <th>
                  <FormattedMessage 
                    id="label_stardust"
                    description="Stardust"
                    defaultMessage="Stardust"
                    />
                </th>
                <th>
                  <FormattedMessage 
                    id="label_lv"
                    description="Level"
                    defaultMessage="Level"
                    />
                </th>
                <th>
                  <FormattedMessage 
                    id="label_candy"
                    description="candy"
                    defaultMessage="Candy"
                    />
                </th>
              </tr>
            </thead>
            <tbody>
              { this.renderContent() }
            </tbody>
          </table>
          <div style={{ lineHeight: '1.3rem', marginTop: '10px' }} className="pm-text-sm color-grey-6">
            <span style={{ fontWeight: 'bold' }}>
              <FormattedMessage 
                id="instruction_label"
                description="detail"
                defaultMessage="Detail:"
                />
            </span>
            <br/>
              1. 
              <FormattedMessage
                id="instruction_p1"
                description="detail p1"
                defaultMessage="Instruction 1"
                />
            <br />
            <br />
              2.
                <FormattedMessage
                  id="instruction_p2"
                  description="detail p2"
                  defaultMessage="Instruction 2"
                  />
            <br />
            <br />
              3.
                <FormattedMessage
                  id="instruction_p3"
                  description="detail p3"
                  defaultMessage="Instruction 3"
                  />
            <br />
            <br />
              4.
                <FormattedMessage
                  id="instruction_p4"
                  description="detail p4"
                  defaultMessage="Instruction 4"
                  />
            <br />
            <br />
              5.
                <FormattedMessage
                  id="instruction_p5"
                  description="detail p5"
                  defaultMessage="Instruction 5"
                  />
          </div>
        </div>
      </Modal>
    );
  }
}
export default StarDustModal;
