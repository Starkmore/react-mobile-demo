import React from "react";
import emitter from "./../../utils/events.js";
import { Button } from "antd-mobile";
export default class EventList extends React.Component {
  constructor(props) {
    super(props);
  
  }
  changeName=()=>{
     emitter.emit('changeMessage','张静')  
}
  render() {
    return(
        <div>
           <Button onClick={()=>this.changeName()} type="primary">点我有惊喜</Button>
        </div>
    );
  }
}