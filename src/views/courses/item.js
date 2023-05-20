import React from "react";
import {Avatar, Checkbox} from "@material-ui/core";
import {PlusCircle, Trash} from "react-feather";

export default class Item extends React.Component {
  render() {
    return (
      <div
        className='border rounded bg-white py-1 px-2 md:flex flex-row items-center  relative px-3 px-md-0 py-3 py-md-0'>
        <div className='md:flex flex-row items-center relative col-md-auto px-0'>
          <div
            className='flex flex-row items-center relative col-md-auto px-0 px-md-3 py-md-2 mb-2 mb-md-0'>
            <div style={{maxHeight: 24, maxWidth: 24}}
                 className='bg-white px-0 flex items-center col-auto overflow-hidden  rounded-circle mr-2 flex-wrap'>
              <Checkbox
                className='m-0 p-0'
                checked={this.props.isChecked()}
                icon={<PlusCircle fontSize={'small'}/>}
                checkedIcon={<Trash fontSize={'small'}/>}
                onChange={() => {
                  this.props.check('TD')
                  this.props.check('CM')
                  this.props.check('TP')
                }}
                name="checkedH"/>
            </div>
            <Avatar className='mr-2 ml-0'
                    style={{width: 20, height: 20, fontSize: 12}}>{this.props.item.LEVEL_ID}</Avatar>
          </div>
          <h6 className='mt-0 mb-1 mr-2 mb-1 mb-md-0 small'>{this.props.item.SUBJECT_NAME}</h6>
        </div>
        {/*<div className='col-md pl-0 text-black-50 small mb-1 mb-md-0'>{this.props.item.CLASS_ID}</div>*/}
      </div>
    );
  }
}