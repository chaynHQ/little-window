import React from "react";
import "./style.css";

export class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1>Little Window</h1>
        <p>Don't tell us personal stuff</p>
        <button className="refreshButton"
          onClick={this.props.refresh}>
          <i className="fas fa-sync-alt" />
        </button>
      </div>
    );
  }
}
