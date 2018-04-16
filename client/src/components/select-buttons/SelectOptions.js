import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';

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

  ${props =>
    props.active &&
    css`
      background: #db5759;
      color: white;
    `};
`;

const SubmitButton = styled.button.attrs({
  disabled: props => props.disabled
})`
  margin: auto;
  border: 2px #b0b0b0 solid;
  color: white;
  background: #7cac95;
  display: block;
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Source Code Pro', monospace;
  padding-top: 3px;
  padding-bottom: 4px;
  margin-bottom: 10px;
  width: 5rem;
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

export default class SelectOptions extends Component {
  static propTypes = {
    selectOptions: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        postback: PropTypes.string.isRequired,
        lookup: PropTypes.string
      })
    ),
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    uniqueId: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired
  };

  static defaultProps = {
    selectOptions: []
  };

  // activeOptions set to an array of false values initially as no options
  // are selected. ActiveOptions is an array of items of the same length as
  // selectOptions (the buttons on the page). The values in activeOptions
  // correspond to whether the button of the same index in selectOptions
  // has currently been selected or not.
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      activeOptions: props.selectOptions.map(() => false)
    };
  }

  // When a country is clicked, it changes the value in activeOptions of the same
  // index to be false if it had been true, and vice versa. If 'none of the above'
  // is selected, all the other buttons in activeOptions are set to false.
  countryOptionClickHandler = (selectOption, index) => {
    this.setState(prevState => {
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
    const selectedCountries = this.state.activeOptions
      .map((option, index) => (option ? this.props.selectOptions[index] : null))
      .filter(Boolean);

    // Add the country to messages in App state so that the countries render on the
    // screen as answers.
    selectedCountries.forEach(countryObj => {
      const data = {
        isUser: true,
        speech: countryObj.text,
        uniqueId: this.props.uniqueId,
        lang: this.props.lang
      };

      this.props.addMessage(data);
    });

    this.props.sendMessage({
      speech: selectedCountries[0].postback,
      uniqueId: this.props.uniqueId,
      lang: this.props.lang,
      selectedCountries
    });
    // setState disabled to true so buttons don't render once submitted.
    this.setState({ disabled: true });
  };

  submitTextLang = lang => {
    if (lang === 'en') return 'Submit';
    else if (lang === 'fr') return 'Soumettre';
  };

  renderSelectOptions = () =>
    this.props.selectOptions.map((selectOption, index) => (
      <CountryOptionDiv
        key={selectOption.text}
        active={this.state.activeOptions[index] ? 'active' : ''}
        onClick={() => this.countryOptionClickHandler(selectOption, index)}
      >
        {selectOption.text}
      </CountryOptionDiv>
    ));

  render() {
    if (this.props.selectOptions.length === 0 || this.state.disabled) {
      return null;
    }

    const optionSelectedBool = this.state.activeOptions.some(Boolean);

    return (
      <div>
        <SelectOptionsDiv>{this.renderSelectOptions()}</SelectOptionsDiv>
        <SubmitButton
          disabled={optionSelectedBool ? '' : 'disabled'}
          onClick={this.submitHandler}
        >
          {this.submitTextLang(this.props.lang)}
        </SubmitButton>
      </div>
    );
  }
}
