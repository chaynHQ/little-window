import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { inputPlaceholderLang, submitTextLang } from '../resources/Languages';

const Container = styled.div`
  height: 15%;
`;

const StyledInput = styled.input`
  width: 75%;
  border: 0px;
  height: 99%;
  padding: 0;
  font-family: 'Source Code Pro', monospace;
  font-size: 16px;
  box-sizing: content-box;
  padding-left: 5%;
  @media (max-width: 350px) {
   font-size: 14px;
   ${props =>
    props.showInput && 
    css`
    width: 94%;
    `};
  }

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
  @media (max-width: 350px) {
    ${props =>
    props.showInput && 
      css`
      display: none;
      `};
    
    ${props =>
    props.greaterThan6 && 
      css`
      font-size: 13px;
      `};
  }
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

  // handle submit sends the data to dialogflow, adds the message to the message
  // array, and sets the input field back to an empty string.
  handleSubmit(e) {
    e.preventDefault();

    const data = {
      isUser: true,
      uniqueId: this.props.uniqueId,
      speech: this.state.term,
      lang: this.props.lang
    };

    this.props.sendMessage(data);
    this.props.addMessage(data);
    this.setState({ term: '' });
  }

  render() {
    if (this.props.minimise) {
      return null;
    }

    const submitText = submitTextLang(this.props.lang);

    return (
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <StyledInput
            type="text"
            name="speech"
            autoComplete="off"
            showInput={this.props.inputStatus}
            placeholder={
              this.props.inputStatus
                ? this.props.inputMessage
                : inputPlaceholderLang(this.props.lang)
            }
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            disabled={this.props.inputStatus}
          />
          <StyledSubmitInput showInput={this.props.inputStatus} type="submit" value={submitText} greaterThan6={submitText.length > 6}/>
        </Form>
      </Container>
    );
  }
}
