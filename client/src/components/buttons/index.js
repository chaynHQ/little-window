import React from "react";
import "./style.scss";
import styled from 'styled-components';

const Botbuttons = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: row;
`
const Styledbutton = styled.button`
border: 2px #B0B0B0 solid;
color: #B0B0B0;
margin: 5%;
border-radius: 15px;
font-size: 1rem;
padding-top: 3px;
padding-bottom: 4px;
width: 5rem;
`

const Countrybutton = styled.button`
border: 2px #B0B0B0 solid;
color: #B0B0B0;
margin: 1%;
border-radius: 15px;
font-size: 1rem;
`

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  clickHandler(speech, postback) {
    const data = {
      isUser: true,
      isWaiting: true,
      speech,
      uniqueId: this.props.uniqueId
    };
    const buttonDots = {
      speech: "..."
    };
    this.props.addMessage(data);
    this.props.addMessage(buttonDots);
    this.props.sendMessage({ speech: postback, uniqueId: this.props.uniqueId });
    this.setState({ disabled: true });
  }

  render() {
    if (!this.props.options)
      return null;

    if (this.state.disabled) return null;

    if (this.props.options.length > 2) {
      return (
        <Botbuttons>
          {
            this.props.options.map((option, index) =>
              <Countrybutton value={option.postback} key={index} onClick={() => this.clickHandler(option.text, option.postback)} >
                {option.text}</Countrybutton>)
          }
        </Botbuttons>
      );
    }
    return (
      <Botbuttons>
        {
          this.props.options.map((option, index) =>
            <Styledbutton value={option.postback} key={index} onClick={() => this.clickHandler(option.text, option.postback)} >
              {option.text}</Styledbutton>)
        }
      </Botbuttons>
    );
  };
}
