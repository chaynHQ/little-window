/* eslint class-methods-use-this: ["error", { "exceptMethods": ["sendToServer"] }] */
/* eslint-env browser */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Conversation from './conversation/Conversation';
import Input from './input/Input';

const Container = styled.div`
  width: 500px;
  height: 500px;
  box-sizing: border-box;
  border: 1px solid black;
  font-family: 'Source Code Pro', monospace;
`;

const speed = {
  fast: 1500,
  slow: 5000,
  superslow: 8000,
};

export default class App extends React.Component {
  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    uniqueIdGenerator: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputStatus: true,
      inputMessage: 'typing...',
      timedelay: '',
    };
  }

  componentDidMount = () => {
    this.sendMessage({
      speech: 'Little window welcome',
      uniqueId: this.props.uniqueId,
    });
  };

  addMessage = (message) => {
    if (!message.isUser && !message.isDot) {
      setTimeout(() => {
        if (message.options.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: 'Choose a button...',
          });
        } else if (message.selectOptions.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: 'Pick one or more options...',
          });
        } else if (message.retrigger) {
          this.setState({ inputStatus: true });
        } else {
          this.setState({ inputStatus: false });
        }
        this.removeWaitingDots();
        this.setState(prevState => ({
          messages: [...prevState.messages, message],
        }));
      }, this.state.timedelay);
    } else {
      this.setState(prevState => ({
        messages: [...prevState.messages, message],
      }));
    }
  };

  removeWaitingDots = () => {
    if (this.state.messages.length > 0) {
      if (this.state.messages[this.state.messages.length - 1].speech === '') {
        this.setState(prevState => ({
          messages: [...prevState.messages.slice(0, -1)],
        }));
      }
    }
  };

  sendMessage = (data) => {
    console.log(this.props.uniqueId);
    this.sendToServer(data)
      .then(res => res.json())
      .then((resData) => {
        this.setState({ timedelay: speed[resData.timedelay] });
        if (resData.retrigger) {
          setTimeout(() => {
            this.sendMessage({
              speech: resData.retrigger,
              uniqueId: this.props.uniqueId,
            });
          }, this.state.timedelay);
        }

        if (resData.options.length === 0) {
          this.setState({ inputStatus: false });
        } else {
          this.setState({
            inputStatus: true,
            inputMessage: 'Choose a button...',
          });
        }

        // create copy of resData to avoid mutating it
        const newMessage = Object.assign({}, resData);

        newMessage.isUser = false;
        this.setState({ inputStatus: true, inputMessage: 'typing...' });
        // Add dots
        this.addMessage({
          speech: '',
          isUser: false,
          isDot: true,
        });

        this.addMessage(newMessage);
      });
  };

  sendToServer = data =>
    fetch('/usermessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data),
    });

  refresh = () => {
    this.props.uniqueIdGenerator();
    this.setState({
      messages: [],
    });

    this.sendMessage({
      speech: 'Little window welcome',
      uniqueId: this.props.uniqueId,
    });
  };

  render() {
    return (
      <Container>
        <Header refresh={this.refresh} />
        <Conversation
          messages={this.state.messages}
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          uniqueId={this.props.uniqueId}
        />

        <Input
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          inputStatus={this.state.inputStatus}
          inputMessage={this.state.inputMessage}
          uniqueId={this.props.uniqueId}
        />
      </Container>
    );
  }
}
