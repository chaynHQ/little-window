import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

// Resources renders the resources from the props passed down, from the
// text and href properties within the array of resources.
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

Resources.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired, href: PropTypes.string.isRequired,
  })),
};

Resources.defaultProps = {
  resources: [],
};

export default Resources;
