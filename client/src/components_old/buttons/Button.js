import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// div is container where there are multiple buttons.
//  Applies to category option buttons.
const Multiplebuttonsdiv = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  cursor: pointer;
  margin-left: 5%;
  width: 90%;
  max-width: 90%;
  -webkit-overflow-scrolling: touch;
  padding-left: 5%;
  padding-right: 5%;
  box-sizing: border-box;
`;

// div is container where there are only 2, or more than 4 buttons.
// Applies to yes/no buttons
const Styledbuttonsdiv = styled.div`
  float: left;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  flex-wrap: wrap;
  margin-left: 5%;
  width: 90%;
`;

// Basic button
const Basicbutton = styled.button`
  border: 2px #b0b0b0 solid;
  color: black;
  background: white;
  border-radius: 15px;
  font-size: 1rem;
  cursor: pointer;
  flex-grow: 1;
  font-family: 'Source Code Pro', monospace;
`;

// Styled button applies to yes/no
const Styledbutton = styled(Basicbutton)`
  margin: 5%;
  padding-top: 3px;
  padding-bottom: 4px;
  min-width: 5rem;
  flex-grow: 1;
`;

// Applies to other buttons
const Multiplebutton = styled(Basicbutton)`
  margin: 0.5%;
  min-height: 3rem;
  height: fit-content;
  outline: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

// prop-types module used to specify the types of the props
const propTypes = {
  uniqueConversationId: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      postback: PropTypes.string.isRequired,
      lookup: PropTypes.string,
    }),
  ),
  updateLang: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

// default props are required when prop does not have isRequired property
const defaultProps = {
  options: [],
};

// Button component for all buttons
class Button extends Component {
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
  clickHandler(option) {
    const {
      updateLang, uniqueConversationId, addMessage, sendMessage, lang,
    } = this.props;

    if (option.lang) {
      // TODO: Probably going to need this to update lang!
      updateLang(option.lang, () => {
        const data = {
          isUser: true,
          speech: option.text,
          uniqueConversationId,
          lang: option.lang,
        };
        addMessage(data);
        sendMessage({
          speech: option.postback,
          uniqueConversationId,
          lang: option.lang,
        });
      });
      this.setState({ disabled: true });
    } else {
      const data = {
        isUser: true,
        speech: option.text,
        uniqueConversationId,
        lang,
      };
      addMessage(data);
      sendMessage({
        speech: option.postback,
        uniqueConversationId,
        lang,
      });
      this.setState({ disabled: true });
    }
  }

  // render button component function. Not rendered if there are no option,
  // or if state.disabled is set to false.

  render() {
    const { options } = this.props;
    const { disabled } = this.state;
    if (!options || disabled) return null;

    const ButtonName = options.length > 2 ? Multiplebutton : Styledbutton;
    const ButtonDiv = options.length > 2 && options.length < 5
      ? Multiplebuttonsdiv
      : Styledbuttonsdiv;
    return (
      <ButtonDiv>
        {options.map((option) => (
          <ButtonName
            value={option.postback}
            key={option.text}
            onClick={() => this.clickHandler(option)}
          >
            {option.text}
          </ButtonName>
        ))}
      </ButtonDiv>
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
