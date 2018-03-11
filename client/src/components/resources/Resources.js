import React from 'react';
import styled from 'styled-components';

const Botresources = styled.div`
  float: left;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Singleresource = styled.a`
  padding: 0.5rem;
  margin: 5px;
  border: 2px #b0b0b0 solid;
  border-radius: 15px;
`;

const Resources = (props) => {
  if (!props.resources) {
    return null;
  }
  return (
    <Botresources>
      {props.resources.map((resource, index) => (
        <Singleresource href={resource.href} key={index} target="__blank">
          {resource.text}
        </Singleresource>
        ))}
    </Botresources>
  );
};

export default Resources;
