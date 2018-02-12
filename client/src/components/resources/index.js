import React from "react";
import "./style.scss";

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.resources){
      return null;
    }
    return (
      <div>
        {this.props.resources.map((resource, index) => {
          return <a href={resource.href} key={index} target="__blank">
          {resource.text}</a>})}
      </div>
    );
  }
}
