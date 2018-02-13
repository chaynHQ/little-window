import React from "react";
import styled from 'styled-components';

const Container = styled.div`
  height: 20%;
  border: 1px solid black;
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

    const dots = {
      speech: "..."
    };

    for (const pair of new FormData(e.target).entries()) {
      data[pair[0]] = pair[1];
    }
    this.props.sendMessage(data);
    this.props.addMessage(data);
    this.props.addMessage(dots);
    this.setState({ term: "" });
  }

  onInputChange(term) {
    this.setState({ term });
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            type="text"
            name="speech"
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            disabled={this.props.inputStatus}
          />
          <input type="submit" value="Submit" />
        </form>
      </Container>
    );
  }
}
