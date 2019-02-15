import React, { Component } from "react";
import EventsList from "./eventsList.js";
import EventsList2 from "./eventsList2.js";
// reduex  部分
import { connect } from "react-redux";
import { homeData } from "./../../reducers/home";

const mapStateToProps = (state, ownProps) => {
  console.log(state, "mapStateToProps");
  return {
    indexData: state.homeRedurces.indexData
  };
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000"
    };
  }
  componentDidMount() {
    this.props.homeData();
    
  }

  clickHandle = (event, a, b) => {
    this.setState({
      color: "#62DAFB"
    });
  };
  // renderFrom(){
  //    return <div>ssss</div>
  // }
  render() {
    const { indexData } = this.props;
    console.log(indexData);
    return (
      <div>
        <div style={{ paddingTop: 60, textAlign: "center", color: this.state.color }} onClick={() => this.clickHandle(this, 1, 2)} data-id={this.state.color}>
          首页 点我
        </div>

        <div style={{ textAlign: "center", marginTop: "10vh" }}>
          <h5>没有嵌套关系的组件通信,使用自定义事件机制:</h5>
          <EventsList />
          <EventsList2 />
        </div>
        <div style={{ textAlign: "center", marginTop: "10vh" }}>内含 redux 的学习方式</div>
      
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  { homeData }
)(Home);
