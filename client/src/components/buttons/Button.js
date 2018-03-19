import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Botbuttons = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const Basicbutton = styled.button`
  border: 2px #b0b0b0 solid;
  color: black;
  background: white;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Source Code Pro', monospace;
`;

const Styledbutton = styled(Basicbutton)`
  margin: 5%;
  padding-top: 3px;
  padding-bottom: 4px;
  width: 5rem;
`;

const Multiplebutton = styled(Basicbutton)`
  margin: 1%;
`;

export default class Button extends Component {
  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      postback: PropTypes.string.isRequired,
      lookup: PropTypes.string,
    })),
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [],
  };

  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      speech,
      uniqueId: this.props.uniqueId,
    };
    this.props.addMessage(data);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options || this.state.disabled) return null;

    const ButtonName =
          this.props.options.length > 2 ? Multiplebutton : Styledbutton;
    return (
      <Botbuttons>
        {this.props.options.map((option, index) => (
          <ButtonName
            value={option.postback}
            key={index}
            onClick={() => this.clickHandler(option.text, option.postback)}
          >
            {option.text}
          </ButtonName>
            ))}
      </Botbuttons>
    );
  }
}
