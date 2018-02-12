import React from "react";
import "./style.scss";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  clickHandler(speech, postback){
    const data = {
      isUser: true,
      isWaiting: true,
      speech
    }
    this.props.addMessage(data)
  }

  render() {
    console.log("buttons", this.props);
    if(!this.props.options){
      return null;
    }
    return (
      <div>
      {this.props.options.map((option, index) => {
        return <button value={option.postback} key={index} onClick={()=> this.clickHandler(option.text, option.postback)}>
        {option.text}</button>})}
      </div>
    );
  }
}
