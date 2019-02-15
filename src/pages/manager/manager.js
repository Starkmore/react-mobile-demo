import React, { Component } from "react";
import { Flex, Toast, Modal, Button } from "antd-mobile";
import "./manager.css";
import List from "./list.js";

const alert = Modal.alert;
class Manager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      listData: []
    };
  }
  handFoucs = event => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value
    });
  };
  handleAdd = () => {
    if (this.state.name) {
      let list = this.state.listData;
      list.push({ name: this.state.name });
      this.setState({
        listData: list,
        name: ""
      });
    } else {
      Toast.offline("请输入姓名", 1);
    }
  };
  handleDelete = e => {
    let list = this.state.listData;
    const _this = this,
      _index = e.target.getAttribute("data-index");
    alert("温馨提示", "确定要删除该条数据?", [
      { text: "取消", onPress: () => console.log("cancel") },
      {
        text: "确定",
        onPress: () => {
          list.splice(_index, 1);
          _this.setState({
            listData: list
          });
          Toast.info("删除成功", 1);
        }
      }
    ]);
  };
  render() {
    return (
      <div className="manager">
        <Flex justify="center">
          <input type="text" onChange={this.handFoucs} value={this.state.name} placeholder="请输入姓名" />
          <Button type="primary" inline size="small" style={{ marginRight: "4px" }} onClick={this.handleAdd}>
            添加
          </Button>
        </Flex>
        <div className="list">
          <Flex justify="center">
            <div className="list-table">ID</div>
            <div className="list-table">姓名</div>
            <div className="list-table">操作</div>
          </Flex>
          <List listData={this.state.listData} delete={this.handleDelete} />
        </div>
      </div>
    );
  }
}

export default Manager;
