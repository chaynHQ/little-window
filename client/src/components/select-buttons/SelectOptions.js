import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { submitTextLang } from '../resources/Languages';

// SelectOptions used for countrybuttons as multiple buttons can be selected
// and then the result submitted.

const SelectOptionsDiv = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin-bottom: 10px;
`;

const CountryOptionDiv = styled.div`
  border: 2px #b0b0b0 solid;
  color: black;
  background: white;
  margin-bottom: 20px;
  margin-right: 5px;
  padding: 5px;
  border-radius: 15px;
  font-size: 1rem;
  flex-grow: 1;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  ${(props) => props.active
    && css`
      background: #f4dfa4;
    `};
`;

const SubmitButton = styled.button.attrs({
  disabled: (props) => props.disabled,
})`
  margin: auto;
  border: 2px #b0b0b0 solid;
  color: black;
  background: #c0d9cbff;
  display: block;
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Source Code Pro', monospace;
  padding-top: 3px;
  padding-bottom: 4px;
  margin-bottom: 10px;
  text-align: center;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background: white;
    color: black;
    cursor: not-allowed;
  }
`;

const propTypes = {
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      postback: PropTypes.string.isRequired,
      lookup: PropTypes.string,
    }),
  ),
  addMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  uniqueConversationId: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
};

const defaultProps = {
  selectOptions: [],
};

class SelectOptions extends Component {
  // activeOptions set to an array of false values initially as no options
  // are selected. ActiveOptions is an array of items of the same length as
  // selectOptions (the buttons on the page). The values in activeOptions
  // correspond to whether the button of the same index in selectOptions
  // has currently been selected or not.
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      activeOptions: props.selectOptions.map(() => false),
    };
  }

  // When a country is clicked, it changes the value in activeOptions of the same
  // index to be false if it had been true, and vice versa. If 'none of the above'
  // is selected, all the other buttons in activeOptions are set to false.
  countryOptionClickHandler = (selectOption, index) => {
    this.setState((prevState) => {
      let newActiveOptions = Array.from(prevState.activeOptions);
      newActiveOptions[index] = !newActiveOptions[index];

      if (selectOption.text === 'None of the above') {
        newActiveOptions = newActiveOptions.map((value, optionIndex) => {
          if (optionIndex !== index) return false;
          return value;
        });
      } else newActiveOptions[newActiveOptions.length - 1] = false;

      return { activeOptions: newActiveOptions };
    });
  };

  // onSubmit, selectedCountries is an array of selectOptions where the
  // corresponding position in activeOptions is true.
  submitHandler = () => {
    const { activeOptions } = this.state;
    const {
      selectOptions, uniqueConversationId, lang, addMessage, sendMessage,
    } = this.props;

    const selectedCountries = activeOptions
      .map((option, index) => (option ? selectOptions[index] : null))
      .filter(Boolean);

    // Add the country to messages in App state so that the countries render on the
    // screen as answers.
    selectedCountries.forEach((countryObj) => {
      const data = {
        isUser: true,
        speech: countryObj.text,
        uniqueConversationId,
        lang,
      };

      addMessage(data);
    });

    sendMessage({
      speech: selectedCountries[0].postback,
      uniqueConversationId,
      lang,
      selectedCountries,
    });
    // setState disabled to true so buttons don't render once submitted.
    this.setState({ disabled: true });
  };

  renderSelectOptions = () => {
    const { activeOptions } = this.state;
    const { selectOptions } = this.props;

    return selectOptions.map((selectOption, index) => (
      <CountryOptionDiv
        key={selectOption.text}
        active={activeOptions[index] ? 'active' : ''}
        onClick={() => this.countryOptionClickHandler(selectOption, index)}
      >
        {selectOption.text}
      </CountryOptionDiv>
    ));
  }

  render() {
    const { disabled, activeOptions } = this.state;
    const { selectOptions, lang } = this.props;

    if (selectOptions.length === 0 || disabled) {
      return null;
    }

    const optionSelectedBool = activeOptions.some(Boolean);

    return (
      <div>
        <SelectOptionsDiv>{this.renderSelectOptions()}</SelectOptionsDiv>
        <SubmitButton
          disabled={optionSelectedBool ? '' : 'disabled'}
          onClick={this.submitHandler}
        >
          {submitTextLang(lang)}
        </SubmitButton>
      </div>
    );
  }
}

SelectOptions.propTypes = propTypes;
SelectOptions.defaultProps = defaultProps;

export default SelectOptions;
