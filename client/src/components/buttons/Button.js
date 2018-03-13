import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Botbuttons = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;
const Styledbutton = styled.button`
  border: 2px #b0b0b0 solid;
  color: #b0b0b0;
  margin: 5%;
  border-radius: 15px;
  font-size: 1rem;
  padding-top: 3px;
  padding-bottom: 4px;
  width: 5rem;
  cursor: pointer;
`;

const Countrybutton = styled.button`
  border: 2px #b0b0b0 solid;
  color: #b0b0b0;
  margin: 1%;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
`;

export default class Button extends React.Component {
  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    options: []
  };

  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      isWaiting: true,
      speech,
      uniqueId: this.props.uniqueId
    };
    this.props.addMessage(data);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options || this.state.disabled) return null;

    if (this.props.options.length > 2) {
      return (
        <Botbuttons>
          {this.props.options.map(option => (
            <Countrybutton
              value={option.postback}
              key={option.postback}
              onClick={() => this.clickHandler(option.text, option.postback)}
            >
              {option.text}
            </Countrybutton>
          ))}
        </Botbuttons>
      );
    }
    return (
      <Botbuttons>
        {this.props.options.map(option => (
          <Styledbutton
            value={option.postback}
            key={option.postback}
            onClick={() => this.clickHandler(option.text, option.postback)}
          >
            {option.text}
          </Styledbutton>
        ))}
      </Botbuttons>
    );
  }
}
