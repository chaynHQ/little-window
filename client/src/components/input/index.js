import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 20%;
`;

const StyledInput = styled.input`
  width: 75%;
  height: 100%;
  border: none;
  padding: 0;
  font-family: "Source Code Pro", monospace;
  font-size: 16px;
  box-sizing: content-box;
  padding-left: 5%;

  &:disabled {
  }

  &::placeholder {
  }
`;

const StyledSubmitInput = styled.input`
  width: 20%;
  height: 100%;
  border: none;
  border-left: 1px solid black;
  box-sizing: border-box;
  padding: 0;
  font-family: "Source Code Pro", monospace;
  font-size: 16px;
`;

const Form = styled.form`
  height: 100%;
  border-top: 1px solid black;
  box-sizing: border-box;
`;

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = {
      isUser: true,
      isWaiting: true,
      uniqueId: this.props.uniqueId
    };

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }
    this.props.sendMessage(data);
    this.props.addMessage(data);
    this.setState({ term: "" });
  }

  onInputChange(term) {
    this.setState({ term });
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <StyledInput
            type="text"
            name="speech"
            placeholder={
              this.props.inputStatus ? "Choose a button..." : "Type here..."
            }
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            disabled={this.props.inputStatus}
          />
          {this.props.inputStatus ? null : (
            <StyledSubmitInput type="submit" value="Submit" />
          )}
        </Form>
      </Container>
    );
  }
}
