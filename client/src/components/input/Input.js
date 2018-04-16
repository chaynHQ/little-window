import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  height: 15%;
`;

const StyledInput = styled.input`
  width: 75%;
  height: 100%;
  border: none;
  padding: 0;
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  box-sizing: content-box;
  padding-left: 5%;

  &:disabled {
    background-color: white;
  }

  &::placeholder {
    color: black;
  }
`;

const StyledSubmitInput = styled.input`
  width: 20%;
  height: 100%;
  border: none;
  border-left: 1px solid black;
  box-sizing: border-box;
  padding: 0;
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  -webkit-appearance: none;
  border-radius: 0;
`;

const Form = styled.form`
  height: 100%;
  border-top: 1px solid black;
  box-sizing: border-box;
  background-color: white;
`;

export default class Input extends Component {
  static propTypes = {
    addMessage: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    inputStatus: PropTypes.bool.isRequired,
    inputMessage: PropTypes.string.isRequired,
    uniqueId: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { term: '' };
  }

  // sets the state to what is currently in the input field.
  onInputChange(term) {
    this.setState({ term });
  }

  inputPlaceholderLang = lang => {
    if (lang === 'en') return 'Type here...';
    else if (lang === 'fr') return 'Tapez ici...';
  };

  submitTextLang = lang => {
    if (lang === 'en') return 'Submit';
    else if (lang === 'fr') return 'Soumettre';
  };

  // handle submit sends the data to dialogflow, adds the message to the message
  // array, and sets the input field back to an empty string.
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      isUser: true,
      uniqueId: this.props.uniqueId,
      speech: this.state.term,
      lang: this.state.lang
    };

    this.props.sendMessage(data);
    this.props.addMessage(data);
    this.setState({ term: '' });
  }

  render() {
    if (this.props.minimise) {
      return null;
    }

    const submitText = this.submitTextLang(this.props.lang);

    return (
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <StyledInput
            type="text"
            name="speech"
            autoComplete="off"
            placeholder={
              this.props.inputStatus
                ? this.props.inputMessage
                : this.inputPlaceholderLang(this.props.lang)
            }
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            disabled={this.props.inputStatus}
          />
          {this.props.inputStatus ? null : (
            <StyledSubmitInput type="submit" value={submitText} />
          )}
        </Form>
      </Container>
    );
  }
}
