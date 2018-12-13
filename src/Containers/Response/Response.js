import { ResponseView } from "../../Components/Response";
import React, { Component } from "react";

export class Response extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.id = id;
  }

  render() {
    return <ResponseView />;
  }
}
