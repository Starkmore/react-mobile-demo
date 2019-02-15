import React from "react";
import emitter from "./../../utils/events.js";
export default class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "张三"
    };
  }
  componentDidMount() {
    let _this = this;
    this.eventEmitter = emitter.addListener("changeMessage", message => {
      this.setState({
        message: message
      });
    });
  }
  componentWillUnmount() {
    //   console.log(emitter.removeListener())
    // emitter.removeAllListeners(this.eventEmitter);
  }
  render() {
    return <div>{this.state.message}</div>;
  }
}
