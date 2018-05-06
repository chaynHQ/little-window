/* eslint class-methods-use-this: ["error", { "exceptMethods": ["sendToServer"] }] */
/* eslint-env browser */

import React from 'react';
import styled, { injectGlobal, css } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Conversation from './conversation/Conversation';
import Input from './input/Input';
import {
  typingMessageLang,
  buttonMessageLang,
  optionsLang
} from './resources/Languages';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid black;
  font-family: 'Source Code Pro', monospace;
  ${props =>
    props.min &&
    css`
      height: 10vh;
      position: absolute;
      bottom: 0;
      left: 0;      
    `};
`;

const speed = {
  fast: 1500,
  slow: 5000,
  superslow: 8000
};

injectGlobal`
  body {
margin: 0;
}
`;

export default class App extends React.Component {
  static propTypes = {
    uniqueId: PropTypes.string.isRequired,
    uniqueIdGenerator: PropTypes.func.isRequired
  };

  // the value passed to minimise on load - window.navigator.userAgent - contains information
  // about the name, version and platform of the browser
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      inputStatus: true,
      inputMessage: 'typing...',
      timedelay: '',
      refreshDisabled: true,
      delayDisabled: false,
      minimise: window.navigator.userAgent.toLowerCase().includes('mobi'),
      lang: 'en'
    };
  }

  // On loading the page the first message is sent to Dialog Flow with
  // speech to bring back first message and sending the unique id.
  componentDidMount = () => {
    if (!this.state.minimise) {
      this.sendMessage({
        speech: 'Little Window language selection',
        uniqueId: this.props.uniqueId,
        lang: this.state.lang
      });
      this.setState({
        uniqueId: this.props.uniqueId
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.minimise === true &&
      prevState.messages.length === 0 &&
      this.state.minimise === false
    ) {
      this.sendMessage({
        speech: 'Little Window language selection',
        uniqueId: this.props.uniqueId,
        lang: this.state.lang
      });
      this.setState({
        uniqueId: this.props.uniqueId
      });
    }
  };

  // Add message and set the text on the disabled input to either choose
  // buttons/options.  If retrigger (waiting for next message to arrive)
  // input also disabled.  Otherwise input is enabled. Dots are removed
  // and message added to messages in state
  addMessage = message => {
    if (!message.isUser && !message.isDot) {
      setTimeout(() => {
        if (message.options.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: buttonMessageLang(this.state.lang)
          });
        } else if (message.selectOptions.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: optionsLang(this.state.lang)
          });
        } else if (message.retrigger) {
          this.setState({ inputStatus: true });
        } else {
          this.setState({ inputStatus: false });
        }
        this.removeWaitingDots();
        this.setState(prevState => ({
          messages: [...prevState.messages, message]
        }));
      }, this.state.timedelay);
    } else {
      this.setState(prevState => ({
        messages: [...prevState.messages, message]
      }));
    }
  };

  // An empty string as message represents the animated waiting dots
  // (these are added with CSS with the dotty class).  Therefore we need to check
  // if last message is empty string to then remove the dots.
  removeWaitingDots = () => {
    if (this.state.messages.length > 0) {
      if (this.state.messages[this.state.messages.length - 1].speech === '') {
        this.setState(prevState => ({
          messages: [...prevState.messages.slice(0, -1)]
        }));
      }
    }
    if (this.state.delayDisabled) {
      this.setState({
        refreshDisabled: false
      });
    }
  };

  // Update the language in the state from the button selected
  updateLang = (selectedLang, cb) => {
    this.setState({ lang: selectedLang }, cb());
  };

  // Send the speech to backend, on response check if there is a retrigger property
  // if so send another message to backend (for a string of messages in a row
  // with no input from user)
  sendMessage = data => {
    this.sendToServer(data)
      .then(res => res.json())
      .then(resData => {
        if (this.state.uniqueId === data.uniqueId) {
          if (resData.refresh) {
            this.setState({ delayDisabled: resData.refresh });
          }
          this.setState({
            refreshDisabled: true,
            timedelay: speed[resData.timedelay]
          });
          if (resData.lang && resData.retrigger) {
            this.setState({ lang: resData.lang });
            setTimeout(() => {
              this.sendMessage({
                speech: resData.retrigger,
                uniqueId: this.state.uniqueId,
                lang: this.state.lang
              });
            }, this.state.timedelay);
          }
          if (resData.retrigger) {
            setTimeout(() => {
              this.sendMessage({
                speech: resData.retrigger,
                uniqueId: this.state.uniqueId,
                lang: this.state.lang
              });
            }, this.state.timedelay);
          }

          if (resData.options.length === 0) {
            this.setState({ inputStatus: false });
          } else {
            this.setState({
              inputStatus: true,
              inputMessage: optionsLang(this.state.lang)
            });
          }

          // create copy of resData to avoid mutating it
          const newMessage = Object.assign({}, resData);

          newMessage.isUser = false;
          this.setState({
            inputStatus: true,
            inputMessage: typingMessageLang(this.state.lang)
          });
          // Add dots
          this.addMessage({
            speech: '',
            isUser: false,
            isDot: true
          });

          this.addMessage(newMessage);
        }
      });
  };

  sendToServer = data =>
    fetch('/usermessage', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data)
    });

  // Refresh resets the conversation so sets a new id and sends first message again.
  // It disables the refresh button so it can't be clicked multiple times (refreshDisabled:true).
  // To enable it again, the third message in Dialog Flow has refresh property in the payload.
  // delayDisabled is set as true in sendMessage when this refresh property comes back.
  // removeWaitingDots checks if delayDisabled is true and if so sets refreshDisabled as false,
  // enabling the refresh button again.
  refresh = () => {
    const newId = this.props.uniqueIdGenerator();

    this.setState({
      messages: [],
      uniqueId: newId,
      refreshDisabled: true,
      delayDisabled: false
    });
    this.sendMessage({
      speech: 'Little Window language selection',
      uniqueId: newId,
      lang: 'en'
    });
  };

  // minimise function passed down to header to the minimise button onClick
  // sets minimise in state to true, this is checked in conversation and input
  // components so they are returned as null and not rendered.  Minimise state is
  // also checked to change CSS in Header and App
  minimiseFunc = () => {
    if (!this.state.minimise) {
      if ('parentIFrame' in window) {
        console.log('REDUCING IFRAME SIZE');
        window.parentIFrame.size('10vh');
      }
      this.setState({
        minimise: true
      });
    } else {
      if ('parentIFrame' in window) {
        console.log('RESTORING IFRAME SIZE');
        window.parentIFrame.size('100vh');
      }
      this.setState({
        minimise: false
      });
    }
  };

  render() {
    return (
      <Container min={this.state.minimise === true ? 'min' : ''}>
        <Header
          refresh={this.refresh}
          refreshDisabled={this.state.refreshDisabled}
          minimiseFunc={this.minimiseFunc}
          minimise={this.state.minimise}
          lang={this.state.lang}
        />
        <Conversation
          messages={this.state.messages}
          updateLang={this.updateLang}
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          uniqueId={this.state.uniqueId || this.props.uniqueId}
          minimise={this.state.minimise}
          lang={this.state.lang}
        />

        <Input
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          inputStatus={this.state.inputStatus}
          inputMessage={this.state.inputMessage}
          uniqueId={this.state.uniqueId || this.props.uniqueId}
          minimise={this.state.minimise}
          lang={this.state.lang}
        />
      </Container>
    );
  }
}
