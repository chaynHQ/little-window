/* eslint class-methods-use-this: ["error", { "exceptMethods": ["sendToServer"] }] */
/* eslint-env browser */

import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './header/Header';
import Conversation from './conversation/Conversation';
import Input from './input/Input';
import {
  typingMessageLang,
  buttonMessageLang,
  optionsLang,
} from './resources/Languages';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  border: 1px solid black;
  font-family: 'Source Code Pro', monospace;
  ${(props) => props.min
    && css`
      position: absolute;
      bottom: 0;
      left: 0;
    `};
`;

const speed = {
  fast: 1500,
  slow: 5000,
  superslow: 8000,
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const propTypes = {
  uniqueConversationId: PropTypes.string.isRequired,
  uniqueIdGenerator: PropTypes.func.isRequired,
};

class App extends React.Component {
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
      lang: 'en',
    };
  }

  // On loading the page the first message is sent to Dialog Flow with
  // speech to bring back first message and sending the unique id.
  componentDidMount = () => {
    const { minimise, lang } = this.state;
    const { uniqueConversationId } = this.props;
    if (!minimise) {
      this.sendMessage({
        speech: 'Little Window language selection',
        uniqueConversationId,
        lang,
      });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { lang, minimise } = this.state;
    const { uniqueConversationId } = this.props;
    if (
      prevState.minimise === true
      && prevState.messages.length === 0
      && minimise === false
    ) {
      this.sendMessage({
        speech: 'Little Window language selection',
        uniqueConversationId,
        lang,
      });
    }
  };

  // Add message and set the text on the disabled input to either choose
  // buttons/options.  If retrigger (waiting for next message to arrive)
  // input also disabled.  Otherwise input is enabled. Dots are removed
  // and message added to messages in state
  addMessage = (message) => {
    const { lang, timedelay } = this.state;
    if (!message.isUser && !message.isDot) {
      setTimeout(() => {
        if (message.options.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: buttonMessageLang(lang),
          });
        } else if (message.selectOptions.length > 0) {
          this.setState({
            inputStatus: true,
            inputMessage: optionsLang(lang),
          });
        } else if (message.retrigger) {
          this.setState({ inputStatus: true });
        } else {
          this.setState({ inputStatus: false });
        }
        this.removeWaitingDots();
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
        }));
      }, timedelay);
    } else {
      this.setState((prevState) => ({
        messages: [...prevState.messages, message],
      }));
    }
  };

  // An empty string as message represents the animated waiting dots
  // (these are added with CSS with the dotty class).  Therefore we need to check
  // if last message is empty string to then remove the dots.
  removeWaitingDots = () => {
    const { messages, delayDisabled } = this.state;
    if (messages.length > 0) {
      if (messages[messages.length - 1].speech === '') {
        this.setState((prevState) => ({
          messages: [...prevState.messages.slice(0, -1)],
        }));
      }
    }
    if (delayDisabled) {
      this.setState({
        refreshDisabled: false,
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
  sendMessage = (data) => {
    const { uniqueConversationId, uniqueIdGenerator } = this.props;
    const { lang, timedelay } = this.state;
    this.sendToServer(data)
      .then((res) => res.json())
      .then((resData) => {
        if (uniqueConversationId === data.uniqueConversationId) {
          if (resData.GDPROptOut) {
            this.refresh();
            this.minimiseFunc();
          } else {
            if (resData.refresh) {
              this.setState({ delayDisabled: resData.refresh });
            }
            this.setState({
              refreshDisabled: true,
              timedelay: speed[resData.timedelay],
            });
            if (resData.lang && resData.retrigger) {
              this.setState({ lang: resData.lang });
              setTimeout(() => {
                this.sendMessage({
                  speech: resData.retrigger,
                  uniqueConversationId,
                  lang,
                });
              }, timedelay);
            }
            if (resData.retrigger) {
              setTimeout(() => {
                this.sendMessage({
                  speech: resData.retrigger,
                  uniqueConversationId,
                  lang,
                });
              }, timedelay);
            }

            if (resData.options.length === 0) {
              this.setState({ inputStatus: false });
            } else {
              this.setState({
                inputStatus: true,
                inputMessage: optionsLang(lang),
              });
            }

            // create copy of resData to avoid mutating it
            const newMessage = { ...resData, uniqueMessageId: uniqueIdGenerator() };

            newMessage.isUser = false;
            this.setState({
              inputStatus: true,
              inputMessage: typingMessageLang(lang),
            });
            // Add dots
            this.addMessage({
              speech: '',
              isUser: false,
              isDot: true,
              uniqueMessageId: uniqueIdGenerator(),
            });

            this.addMessage(newMessage);
          }
        }
      });
  };

  sendToServer = (data) => fetch('/usermessage', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });

  // Refresh resets the conversation so sets a new id and sends first message again.
  // It disables the refresh button so it can't be clicked multiple times (refreshDisabled:true).
  // To enable it again, the third message in Dialog Flow has refresh property in the payload.
  // delayDisabled is set as true in sendMessage when this refresh property comes back.
  // removeWaitingDots checks if delayDisabled is true and if so sets refreshDisabled as false,
  // enabling the refresh button again.
  refresh = () => {
    const { uniqueIdGenerator } = this.props;
    const newId = uniqueIdGenerator();

    this.setState({
      messages: [],
      refreshDisabled: true,
      delayDisabled: false,
    });
    this.sendMessage({
      speech: 'Little Window language selection',
      uniqueConversationId: newId,
      lang: 'en',
    });
  };

  // minimise function passed down to header to the minimise button onClick
  // sets minimise in state to true, this is checked in conversation and input
  // components so they are returned as null and not rendered.  Minimise state is
  // also checked to change CSS in Header and App
  minimiseFunc = () => {
    const { minimise } = this.state;

    if (!minimise) {
      // If parentIframe exists on window object
      if ('parentIFrame' in window) {
        // getPageInfo() gives you a load of data about the parent site
        // You pass in a cb function, which is provided the data as an arguement
        // Here we're only using clientHeight (the height of viewport in px)
        window.parentIFrame.getPageInfo(({ clientHeight }) => {
          // size() is a function which allows you to manually set the size of the iframe
          // You have to provide a Number which is set as a px value
          // Here we're setting size to 1/10 of the viewport
          window.parentIFrame.size(clientHeight * 0.1);
        });
      }
      this.setState({
        minimise: true,
      });
    } else {
      if ('parentIFrame' in window) {
        window.parentIFrame.getPageInfo(({ clientHeight }) => {
          // Setting iframe height back to equivalent of 80vh
          window.parentIFrame.size(clientHeight * 0.8);
        });
      }
      this.setState({
        minimise: false,
      });
    }
  };

  render() {
    const { uniqueConversationId } = this.props;
    const {
      minimise, refreshDisabled, lang, messages, inputStatus, inputMessage,
    } = this.state;

    return (
      <Container min={minimise === true ? 'min' : ''}>
        <GlobalStyle />
        <Header
          refresh={this.refresh}
          refreshDisabled={refreshDisabled}
          minimiseFunc={this.minimiseFunc}
          minimise={minimise}
          lang={lang}
        />
        <Conversation
          messages={messages}
          updateLang={this.updateLang}
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          uniqueConversationId={uniqueConversationId}
          minimise={minimise}
          lang={lang}
        />
        <Input
          addMessage={this.addMessage}
          sendMessage={this.sendMessage}
          inputStatus={inputStatus}
          inputMessage={inputMessage}
          uniqueConversationId={uniqueConversationId}
          minimise={minimise}
          lang={lang}
        />
      </Container>
    );
  }
}

App.propTypes = propTypes;

export default App;
