import React from 'react'
import iucLogo from '../../assets/img/iuc-logo.png'
import {Chip, CircularProgress, Fab, FormControl, Grid, Input, InputLabel, TextField} from "@material-ui/core";
import {Mail, MapPin, MessageSquare, Send} from "react-feather";
import {FormattedMessage} from "react-intl";
import CookieH from "../../helpers/cookie.h";
import contactUs from "../../assets/img/contactUs.svg";
import {GlobalContext} from "../../utilities/Global";

export default class ContactUs extends React.Component {
  
  state = {
    MESSAGE: '',
    predefinedSelected: '',
    predefined: [
      {text: 'Unable insert attachment', value: 'Unable insert attachment'},
      {text: 'Class absent for request', value: 'Class absent for request'},
      {text: 'Subject absent for request', value: 'Subject absent for request'},
      {text: 'Unable to close request', value: 'Unable to close request'},
      {text: 'Unable to link to academy with gmail account', value: 'Unable to link to academy with gmail account'},
      {text: 'Time table not appear', value: 'Time table not appear'},
      {text: 'Other', value: ''},
    ],
    OBJECT: ''
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className="max-w-screen-2xl mx-auto p-12 relative shadow-2xl bg-gradient-to-r from-gray-50 bg-white rounded-xl">
              <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="col-9">
                  <div className="flex mb-3 px-5 items-center ">
                    <div className="flex-1 text-left">
                      <h1 className='text-3xl'><FormattedMessage id="Contact Us"/></h1>
                    </div>
                    <div>
                      <img src={iucLogo} alt="#" className="w-full"/>
                    </div>
                  </div>
                  <div className="overflow-hidden flex flex-row rounded">
                    <div className="col-8 relative px-5 pb-5 pt-3" style={{boxSizing: 'border-box'}}>
                      <Grid container spacing={3} className="mt-2">
                        <Grid item sm={11}>
                          <h6 className='pt-3 text-xs'>
                            <FormattedMessage id="Leave us your coordonates and tell us your problem with the site"/>
                          </h6>
                        </Grid>
                        <Grid item sm={1}>
                          <div className="text-center">
                            <MessageSquare/>
                          </div>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl fullWidth className="">
                            <InputLabel><FormattedMessage id="Your name"/></InputLabel>
                            <Input
                              value={CookieH.getUser()?.FIRSTNAME + ' ' + CookieH.getUser()?.LASTNAME}
                              disabled/>
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl fullWidth className="">
                            <InputLabel><FormattedMessage id="Email address"/></InputLabel>
                            <Input
                              value={CookieH.getUser()?.EMAIL}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl fullWidth className="">
                            <InputLabel><FormattedMessage id="Matricule"/></InputLabel>
                            <Input
                              value={CookieH.getUser()?.MATRICULE}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item sm={6}>
                          <FormControl fullWidth className="">
                            <InputLabel><FormattedMessage id="Phone number"/></InputLabel>
                            <Input
                              value={CookieH.getUser()?.NUMPHONE}
                              disabled
                            />
                          </FormControl>
                        </Grid>
                        <Grid item sm={12}>
                          {this.state.predefined.map(pred => {
                            return <Chip
                              label={<FormattedMessage id={pred.text}/>}
                              variant={this.state.predefinedSelected === pred.value ? 'default' : 'outline'}
                              onClick={() => {
                                this.setState({OBJECT: pred.value, predefinedSelected: pred.value})
                              }} className='m-1'/>
                          })}
                        </Grid>
                        <Grid item sm={12}>
                          <TextField
                            label={<FormattedMessage id="Enter your mail object here"/>}
                            fullWidth
                            className="mt-2 "
                            variant="outlined"
                            value={this.state.OBJECT}
                            onChange={e => this.setState({OBJECT: e.target.value})}
                          />
                        </Grid>
                        <Grid item sm={12}>
                          <TextField
                            label={<FormattedMessage id="Enter your message here"/>}
                            fullWidth
                            className="mt-2"
                            variant="outlined"
                            multiline rows={4}
                            value={this.state.MESSAGE}
                            onChange={e => this.setState({MESSAGE: e.target.value})}
                          />
                        </Grid>
                      </Grid>
                      <Fab style={{position: 'absolute', bottom: 24, right: 20}}
                           onClick={() => {
                             if (!this.state.SENDING) {
                               if (this.state.MESSAGE.length === 0 || this.state.OBJECT.length === 0) {
                                 context.setState({
                                   messageSb: 'Make sure to fill the object and message content',
                                   openSb: true,
                                   severitySb: 'warning'
                                 })
                               } else {
                                 this.setState({SENDING: true})
                                 context.contactUs(
                                   this.state.OBJECT,
                                   this.state.MESSAGE,
                                   CookieH.getUser()?.FIRSTNAME + ' ' + CookieH.getUser()?.LASTNAME,
                                   CookieH.getUser()?.EMAIL,
                                   CookieH.getUser()?.MATRICULE,
                                   CookieH.getUser()?.NUMPHONE)?.then(res => {
                                   if (res && res.status === 200)
                                     this.setState({MESSAGE: '', OBJECT: ''})
                                   this.setState({SENDING: false})
                                 })
                               }
                             } else {
                               context.setState({
                                 messageSb: 'Cannot continue! nother mail is processing',
                                 openSb: true,
                                 severitySb: 'warning'
                               })
                             }
                           }} color="primary">
                        {this.state.SENDING ? <CircularProgress color="secondary"/> : <Send/>}
                      </Fab>
                    </div>
                    <div className="col-4 px-8 rounded-lg text-white pt-4 px-4 flex justify-center flex-col" style={{backgroundColor: '#DB3D44'}}>
                      <h3 className='text-xl font-semibold'>Descriptions</h3>
                      <div className='pb-4 pt-2  text-justify'>
                        <FormattedMessage id="Contact us text"/>
                      </div>
                      <div>
                        <div className='flex'>
                          <Mail size={16}/>&nbsp;&nbsp;<a href='mailto:numerique.educatif@myiuc.com' className='text-white'>numerique.educatif@myiuc.com</a>
                        </div>
                        <div className='mt-2 flex'>
                          <MapPin size={16}/>&nbsp;&nbsp;<span>Institut Universitaire de la Côte</span>
                        </div>
                      </div>
                      <br/>
                      <img src={contactUs} alt="" className='w-full mx-1 mt-5' width={200}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}
