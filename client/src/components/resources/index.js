import React from "react";
import styled from 'styled-components';


const Botresources = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const Singleresource = styled.a`
padding: 0.5rem;
margin: 5px;
border: 2px #B0B0B0 solid;
border-radius: 15px;
`

export default class Resources extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.resources) {
      return null;
    }
    return (
      <Botresources>
        {this.props.resources.map((resource, index) => {
          return <Singleresource href={resource.href} key={index} target="__blank">
            {resource.text}</Singleresource>
        })}
      </Botresources>
    );
  }
}
