import React, { Component } from "react";
import { Flex } from "antd-mobile";
export default class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let list = [];
    if (this.props.listData.length > 0) {
      this.props.listData.map((item, index) => {
        list.push(
          <div key={index}>
            <Flex justify="center">
              <div className="list-table">{index}</div>
              <div className="list-table">{item.name}</div>
              <div className="list-table list-delete" onClick={this.props.delete} data-index={index}>
                删除
              </div>
            </Flex>
          </div>
        );
      });
    } else {
      list = (
        <div style={{ padding: "20px 0" }}>
          <Flex justify="center">
            <span>暂无数据</span>
          </Flex>
        </div>
      );
    }

    return <div>{list}</div>;
  }
}
