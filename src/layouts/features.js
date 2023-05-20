import * as React from 'react';

import features from '../assets/img/features.svg'
import CookieH from "../helpers/cookie.h";
import {Button, Dialog, DialogActions, DialogContent} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {AlertTriangle, Star} from "react-feather";
import CookieC from "../constants/cookie.c";
import {GlobalContext} from "../utilities/Global";
import {IntlLng} from "../components/intlLng";

export default function Features() {
  const [open, setOpen] = React.useState(true);
  
  const handleClose = (context) => {
    CookieH.setVersion()
    setOpen(false);
    context.setState({openFeature: false});
  }
  
  return (
    <GlobalContext.Consumer>
      {context => (
        <Dialog
          fullWidth
          maxWidth='lg'
          open={open || context.state.openFeature}
        >
          <div style={{position: 'absolute', left: 24, top: 24}}>
            <IntlLng/>
          </div>
          <h1 className='text-center mt-5 font-weight-bolder'><FormattedMessage
            id='Whats New In Galio MYIUC'/> {CookieC.VERSION}</h1>
          <DialogContent>
            <div className='text-center col-9 mx-auto font-weight-bold' style={{fontSize: 15}}>
              {/*Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus exercitationem fugiat minima nam, nisi*/}
              {/*officiis quos! A at consectetur, culpa cupiditate debitis ea error esse et facere hic id inventore maiores*/}
              {/*maxime nemo officiis possimus quam, qui quibusdam, tempora ut.*/}
            </div>
            <br/>
            <br/>
            <div className='px-5 flex'>
              <img src={features} alt="" height={200}/>
              <div className='pl-5'>
                <h2 className='font-weight-bold badge badge-warning'><FormattedMessage id='Bugfix'/> <AlertTriangle
                  size={16}/></h2>
                <ul>
                  <li className='mb-2'><FormattedMessage id='Bugfix1'/></li>
                  <li className='mb-2'><FormattedMessage id='Bugfix2'/></li>
                  <li className='mb-2'><FormattedMessage id='Bugfix3'/></li>
                  {/*<li className='mb-2'><FormattedMessage id='Bugfix4'/></li>*/}
                </ul>
                <h2 className='font-weight-bold mt-2 badge badge-success'><FormattedMessage id='Improvement'/> <Star
                  size={16}/></h2>
                <ul>
                  <li className='mb-2'><FormattedMessage id='Improvement1'/></li>
                  <li className='mb-2'><FormattedMessage id='Improvement2'/></li>
                  <li className='mb-2'><FormattedMessage id='Improvement3'/></li>
                  <li className='mb-2'><FormattedMessage id='Improvement4'/></li>
                  <li className='mb-2'><FormattedMessage id='Improvement5'/></li>
                </ul>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(context)} color='primary' variant='contained'><FormattedMessage
              id="LET'S GO"/></Button>
          </DialogActions>
        </Dialog>
      )}</GlobalContext.Consumer>
  );
}
