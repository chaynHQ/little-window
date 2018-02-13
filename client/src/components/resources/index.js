import React from "react";
import "./style.scss";
import styled from 'styled-components';


const Botresources = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.resources){
      return null;
    }
    return (
      <Botresources>
        {this.props.resources.map((resource, index) => {
          return <a href={resource.href} key={index} target="__blank">
          {resource.text}</a>})}
      </Botresources>
    );
  }
}
