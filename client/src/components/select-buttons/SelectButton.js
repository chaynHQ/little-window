import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class SelectButton extends Component {
  static defaultProps = {
    selectOptions: [],
  }

  constructor(props) {
    super(props);
    this.state = { disabled: false };
  }

  renderSelectOptions = () => {
    return this.props.selectOptions.map((selectOption) => {
      return <div>{selectOption.text}</div>
    });
  }

  render() {
    if (this.props.selectOptions.length > 1) return null;

    return (
      this.renderSelectOptions()
    );
  }
}

export default SelectButton;
