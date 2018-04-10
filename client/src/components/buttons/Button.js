import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// div is container where there are multiple buttons.
//  Applies to category option buttons.
const Multiplebuttonsdiv = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  justify-content: space-around;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
`;

// div is container where there are only 2, or more than 4 buttons.
// Applies to yes/no buttons
const Styledbuttonsdiv = styled.div`
  float: left;
  display: flex;
  margin-left: 5%;
  flex-direction: row;
  cursor: pointer;
  flex-wrap: wrap;
  min-width: 90%;
`;

// Basic button
const Basicbutton = styled.button`
  border: 2px #b0b0b0 solid;
  color: black;
  background: white;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Source Code Pro', monospace;
`;

// Styled button applies to yes/no
const Styledbutton = styled(Basicbutton)`
  margin: 5%;
  margin-right: 0%;
  padding-top: 3px;
  padding-bottom: 4px;
  width: 5rem;
`;

// Applies to other buttons
const Multiplebutton = styled(Basicbutton)`
  margin: 0.5%;
`;


// Button component for all buttons
export default class Button extends Component {
  // prop-types module used to specify the types of the props
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

  // default props are required when prop does not have isRequired property
  static defaultProps = {
    options: [],
  };

  // disabled property determines if buttons are displayed or not.
  // Buttons are displayed before one is clicked.
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  // clickHandler happens on user input.
  // addMessage adds the message to state in App
  // sendMessage sends the message to dialogflow
  // once a button is clicked, state is set to disabled so that buttons don't
  // appear
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

  // render button component function. Not rendered if there are no option,
  // or if state.disabled is set to false.

  render() {
    if (!this.props.options || this.state.disabled) return null;

    const ButtonName =
      this.props.options.length > 2 ? Multiplebutton : Styledbutton;
    const ButtonDiv =
      this.props.options.length > 2 && this.props.options.length < 5 ?
        Multiplebuttonsdiv : Styledbuttonsdiv;
    return (
      <ButtonDiv>
        {this.props.options.map((option, index) => (
          <ButtonName
            value={option.postback}
            key={index}
            onClick={() => this.clickHandler(option.text, option.postback)}
          >
            {option.text}
          </ButtonName>
        ))}
      </ButtonDiv>
    );
  }
}
