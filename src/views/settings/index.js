import React, {useContext} from 'react'
import {Button, Divider} from "@material-ui/core";
import SwitchButton from "../../components/switchButton";
import {GlobalContext} from "../../utilities/Global";

const Settings = () => {
  const context = useContext(GlobalContext)
  return (
    <div className="h-full relative py-5 px-5" style={{zIndex: 20}}>
      <h4>General configuration</h4>
      <div className='w-50 small mb-2'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eos error ex facilis iste
        necessitatibus nulla odit, optio qui quia quidem quisquam voluptas voluptatum! Accusantium eum odit
        perspiciatis repellendus sunt.
      </div>
      <Divider/>
      <div className='mt-4'>
        <div className='flex'>
          <div className='w-25 mr-3'>
            <span className='font-weight-bold'>Language settings</span>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eaque id incidunt, molestiae
              odio
              qui!
            </div>
          </div>
          <SwitchButton
            checked={context.state.settings.lang}
            onChange={(e, v) => {
              let settings = context.state.settings
              settings.lang = v
              context.setState({settings})
            }}/>
        </div>
      </div>
      <Button color='primary' variant='contained' className='mt-3' onClick={context.setSettings}>Save</Button>
    </div>
  )
}

export default Settings