import React from "react";
import Icon from "@mdi/react";
import {Button, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select} from '@material-ui/core'
import {mdiBankOutline, mdiCardAccountDetailsOutline, mdiUnicode} from "@mdi/js";
import {Save, Trash2} from "react-feather";
import {GlobalContext} from "../../../../utilities/Global";
import CnpsRemoveMessageDialog from "./cnpsRemoveMessageDialog";
import DropzoneProgrammatically from "./dropzone/DropzoneProgrammatically";
import Avatar from "@material-ui/core/Avatar";
import {FormattedMessage} from "react-intl";
import GInput from "../../../../components/gInput";

export default class Rh extends React.Component {
  
  state = {
    openConfirmCnps: false
  }
  
  render() {
    
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className='grid max-w-6xl mx-auto gap-x-8 pt-5'>
              <form onSubmit={(e) => {
                e.preventDefault()
                context.updatePersonal()
              }} className='text-left col-start-1 col-end-10'>
                <Grid className='text-left px-3 px-md-0'>
                  <CnpsRemoveMessageDialog agree={() => {
                    context.setState({NIU: '', NUMCNPS: '', CNPSYN: false})
                  }} disagree={() => {
                    context.setState({CNPSYN: true})
                  }} open={this.state.openConfirmCnps}
                                           setClose={() => this.setState({openConfirmCnps: false})}/>
                  <Grid container spacing={3}>
                    <Grid xs={12}
                          className="px-2 px-md-0 md:flex flex-row-reverse justify-end block items-center">
                      <div className='md:inline text-right text-md-left'>
                        <Button onClick={context.updateIdentification}
                                disabled={context.state.submittedRh1}
                                color={context.state.submittedRh1 ? 'default' : 'primary'}
                                variant='contained'>
                          <Save size={24} strokeWidth={1}/>
                        </Button>
                      </div>
                      <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                                           <span className='hidden md:inline'>
                                               <Icon path={mdiCardAccountDetailsOutline} size={1}/>&nbsp;&nbsp;</span>
                        <span className='mr-2'><FormattedMessage id="Personal identification"/></span>
                      </h5>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="ID Type"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          disabled={context.state.ACTIVED}
                          id="demo-simple-select"
                          value={context.state.IDENTIFICATION}
                          onChange={e => {
                            context.setState({IDENTIFICATION: e.target.value})
                            context.setState({submittedRh1: false})
                          }}
                        >
                          {context.state.identifTypes?.filter(e=>e.id==='CNI')?.map(e => (
                            <MenuItem value={e.id}>{e.ITYPENAME} - {e.ITYPEABR}</MenuItem>))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='IDNumber'
                        value={context.state.IDENTIFNUM}
                        disabled={context.state.ACTIVED}
                        label='IDNumber'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFNUM: e.target.value})
                          context.setState({submittedRh1: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='Delivery'
                        value={context.state.IDENTIFPLACE}
                        disabled={context.state.ACTIVED}
                        label='Delivery place'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFPLACE: e.target.value})
                          context.setState({submittedRh1: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <GInput
                        id='begin'
                        type='date'
                        value={context.state.IDENTIFSTART}
                        disabled={context.state.ACTIVED}
                        label='Valid begin date'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFSTART: e.target.value})
                          context.setState({submittedRh1: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <GInput
                        id='end'
                        type='date'
                        value={context.state.IDENTIFEND}
                        disabled={context.state.ACTIVED}
                        label='Valid end date'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFEND: e.target.value})
                          context.setState({submittedRh1: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} style={{minHeight: 54, height: 54}}
                          className='p-0 file-item-upload-space flex justify-around items-center mt-2'>
                      {context.state.IDENTITY1 ? (<div className='flex items-center'>
                          <a href={context.state.IDENTITY1}><FormattedMessage id="Attachment recto"/></a>
                          {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                             style={{height: 32, width: 32}}
                                                             onClick={() => context.removeDiploma('IDENTITY1')}
                          >
                            <Trash2 style={{height: 16}}/>
                          </Avatar>}
                        </div>) :
                        <DropzoneProgrammatically
                          context={context}
                          col='IDENTITY1' submit='submittedRh1'/>}
                      {context.state.IDENTITY2 ? (<div className='flex items-center'>
                        <a href={context.state.IDENTITY2}><FormattedMessage id="Attachment verso"/></a>
                        {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                           style={{height: 32, width: 32}}
                                                           onClick={() => context.removeDiploma('IDENTITY2')}
                        >
                          <Trash2 style={{height: 16}}/>
                        </Avatar>}
                      </div>) : context.state.ACTIVED ? null :
                        <DropzoneProgrammatically
                          context={context}
                          col='IDENTITY2' submit='submittedRh1'/>}
                    </Grid>
                    <Grid xs={12}
                          className="px-2 px-md-0 md:flex flex-row-reverse justify-end block items-center">
                      <div className='md:inline text-right text-md-left'>
                        <Button onClick={context.updateTravelIdentification}
                                disabled={context.state.submittedRhPass}
                                color={context.state.submittedRhPass ? 'default' : 'primary'}
                                variant='contained'>
                          <Save size={24} strokeWidth={1}/>
                        </Button>
                      </div>
                      <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                        <div className='hidden md:inline'>
                          <Icon path={mdiCardAccountDetailsOutline} size={1}/>&nbsp;&nbsp;</div>
                          <span className='mr-2'><FormattedMessage id="Travel identification"/></span>
                      </h5>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="ID Type"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          disabled={context.state.ACTIVED}
                          id="demo-simple-select"
                          value={context.state.IDENTIFICATION_PASSPORT}
                          onChange={e => {
                            context.setState({IDENTIFICATION_PASSPORT: e.target.value})
                            context.setState({submittedRhPass: false})
                          }}
                        >
                          {context.state.identifTypes?.filter(e => e.id === 'PASSPORT')?.map(e => (
                            <MenuItem value={e.id}>{e.ITYPENAME} - {e.ITYPEABR}</MenuItem>))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='ID'
                        value={context.state.IDENTIFNUM_PASSPORT}
                        disabled={context.state.ACTIVED}
                        label='ID number'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFNUM_PASSPORT: e.target.value, submittedRhPass: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='Delivery'
                        value={context.state.IDENTIFPLACE_PASSPORT}
                        disabled={context.state.ACTIVED}
                        label='Delivery place'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFPLACE_PASSPORT: e.target.value, submittedRhPass: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <GInput
                        id='IDENTIFSTART_PASSPORT'
                        type='date'
                        value={context.state.IDENTIFSTART_PASSPORT}
                        disabled={context.state.ACTIVED}
                        label='Valid begin date'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFSTART_PASSPORT: e.target.value, submittedRhPass: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <GInput
                        id='IDENTIFEND_PASSPORT'
                        type='date'
                        value={context.state.IDENTIFEND_PASSPORT}
                        disabled={context.state.ACTIVED}
                        label='Valid end date'
                        hint=' '
                        onChange={e => {
                          context.setState({IDENTIFEND_PASSPORT: e.target.value, submittedRhPass: false})
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6} style={{minHeight: 54, height: 54}}
                          className='p-0 file-item-upload-space flex flex-nowrap justify-around items-center mt-2'>
                      {context.state.IDENTITY1_PASSPORT ? (<div className='flex whitespace-nowrap items-center'>
                          <a href={context.state.IDENTITY1_PASSPORT}><FormattedMessage id="Attachment recto"/></a>
                          {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                             style={{height: 32, width: 32}}
                                                             onClick={() => context.removeDiploma('IDENTITY1_PASSPORT')}
                          >
                            <Trash2 style={{height: 16}}/>
                          </Avatar>}
                        </div>) :
                        <DropzoneProgrammatically
                          context={context}
                          col='IDENTITY1_PASSPORT' submit='submittedRh1'/>}
                      {context.state.IDENTITY2_PASSPORT ? (<div className='flex whitespace-nowrap items-center'>
                        <a href={context.state.IDENTITY2_PASSPORT}><FormattedMessage id="Attachment verso"/></a>
                        {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                           style={{height: 32, width: 32}}
                                                           onClick={() => context.removeDiploma('IDENTITY2_PASSPORT')}
                        >
                          <Trash2 style={{height: 16}}/>
                        </Avatar>}
                      </div>) : context.state.ACTIVED ? null :
                        <DropzoneProgrammatically
                          context={context}
                          col='IDENTITY2_PASSPORT' submit='submittedRh1'/>}
                    </Grid>
                    <Grid xs={12}
                          className="mt-4 mt-md-auto px-2 px-md-0 md:flex flex-row-reverse justify-end block items-center">
                      <div className='md:inline text-right text-md-left'>
                        <Button onClick={context.updateFinancial} disabled={context.state.submittedRh2}
                                color={context.state.submittedRh2 ? 'default' : 'primary'}
                                variant='contained'>
                          <Save size={24} strokeWidth={1}/>
                        </Button>
                      </div>
                      <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                                            <span className='hidden md:inline'>
                                                <Icon path={mdiUnicode} size={1}/>&nbsp;&nbsp;</span>
                        <span className='mr-2'><FormattedMessage id="Fiscal and social"/></span>
                      </h5>
                    </Grid>
                    
                    <Grid item xs={12} md={6} className='flex items-center'>
                      <Checkbox
                        className='mt-2'
                        checked={context.state.CNPSYN}
                        disabled={context.state.ACTIVED}
                        onChange={e => {
                          if (!e.target.checked)
                            this.setState({openConfirmCnps: true})
                          else
                            context.setState({CNPSYN: true})
                          context.setState({submittedRh2: false})
                        }}/>
                      <GInput
                        id='CNPSNUM'
                        value={context.state.NIU}
                        disabled={context.state.ACTIVED || (!context.state.CNPSYN && !context.state.ACTIVED)}
                        label="Unique identification number (UIN)"
                        hint=' '
                        onChange={e => {
                          context.setState({NIU: e.target.value, submittedRh2: false})
                        }}
                      />
                      {/*<FormControlInput*/}
                      {/*  label={<FormattedMessage id="Unique identification number (UIN)"/>}*/}
                      {/*  value={context.state.NIU}*/}
                      {/*  disabled={context.state.ACTIVED || (!context.state.CNPSYN && !context.state.ACTIVED)}*/}
                      {/*  setValue={NIU => {*/}
                      {/*    context.setState({NIU})*/}
                      {/*    context.setState({submittedRh2: false})*/}
                      {/*  }}/>*/}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <GInput
                        id='CNPSNUM'
                        value={context.state.CNPSNUM}
                        disabled={context.state.ACTIVED}
                        label="The National Social Security Fund number(CNPS)"
                        hint=' '
                        onChange={e => {
                          context.setState({CNPSNUM: e.target.value, submittedRh2: false})
                        }}
                      />
                      {/*<FormControlInput*/}
                      {/*  value={context.state.CNPSNUM}*/}
                      {/*  label={<FormattedMessage id="The National Social Security Fund number(CNPS)"/>}*/}
                      {/*  disabled={context.state.ACTIVED || (!context.state.CNPSYN && !context.state.ACTIVED)}*/}
                      {/*  setValue={CNPSNUM => {*/}
                      {/*    context.setState({CNPSNUM})*/}
                      {/*    context.setState({submittedRh2: false})*/}
                      {/*  }}/>*/}
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <div
                        className='file-item-upload-space flex justify-center items-center'>
                        {context.state.NIU_LINK ? (<div className='flex items-center'>
                          <a href={context.state.NIU_LINK}><FormattedMessage id="NIU attachment"/></a>
                          {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                             style={{height: 32, width: 32}}
                                                             onClick={() => context.removeDiploma('NIU_LINK')}
                          >
                            <Trash2 style={{height: 16}}/>
                          </Avatar>}
                        </div>) : context.state.ACTIVED ? null :
                          <DropzoneProgrammatically
                            context={context}
                            col='NIU_LINK' submit='submittedRh2'
                            text={"Upload your UIN certificate file here"}/>}
                      </div>
                    </Grid>
                    {/*<Grid item md={6} xs={12}>*/}
                    {/*    <div*/}
                    {/*        className='file-item-upload-space flex justify-center items-center'>*/}
                    {/*        {context.state.CNPS_LINK ? (<div className='flex items-center'>*/}
                    {/*                <a href={context.state.CNPS_LINK}><FormattedMessage*/}
                    {/*                    id="CNPS attachment"/></a>*/}
                    {/*                {!context.state.ACTIVED && <Avatar clflex-1assName='my-2 shadow bg-secondary ml-2'*/}
                    {/*                                                   style={{height: 32, width: 32}}*/}
                    {/*                                                   onClick={() => context.removeDiploma('CNPS_LINK')}*/}
                    {/*                >*/}
                    {/*                    <Trash2 style={{height: 16}}/>*/}
                    {/*                </Avatar>}*/}
                    {/*            </div>) :*/}
                    {/*            <DropzoneProgrammatically*/}
                    {/*                context={context}*/}
                    {/*                col='CNPS_LINK' submit='submittedRh2'*/}
                    {/*                text={"Upload your CNPS attachment file here"}/>}*/}
                    {/*    </div>*/}
                    {/*</Grid>*/}
                    {context.state.ACTIVITY_PRINCIPAL === 'officer' &&
                      <Grid item xs={12} md={4} style={{minHeight: 54, height: 54}}>
                        <div
                          className='file-item-upload-space flex justify-center items-center'>
                          {context.state.PRESENCE_ATTEST ? (<div className='flex items-center'>
                            <a href={context.state.PRESENCE_ATTEST}><FormattedMessage
                              id="Certificate of actual presence"/></a>
                            {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                               style={{height: 32, width: 32}}
                                                               onClick={() => context.removeDiploma('PRESENCE_ATTEST')}
                            >
                              <Trash2 style={{height: 16}}/>
                            </Avatar>}
                          </div>) : context.state.ACTIVED ? null :
                            <DropzoneProgrammatically
                              context={context}
                              col='PRESENCE_ATTEST' submit='submittedRh2'
                              text={"Upload your certificate of actual presence file here"}/>}
                        </div>
                      </Grid>
                    }
                    {context.state.ACTIVITY_PRINCIPAL === 'officer' &&
                      <Grid item xs={12} md={4} style={{minHeight: 54, height: 54}}>
                        <div
                          className='file-item-upload-space flex justify-center items-center'>
                          {context.state.MINISTERIAL_DECREE ? (<div className='flex items-center'>
                            <a href={context.state.MINISTERIAL_DECREE}><FormattedMessage
                              id="Ministerial decree of appointment"/></a>
                            {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                               style={{height: 32, width: 32}}
                                                               onClick={() => context.removeDiploma('MINISTERIAL_DECREE')}
                            >
                              <Trash2 style={{height: 16}}/>
                            </Avatar>}
                          </div>) : context.state.ACTIVED ? null :
                            <DropzoneProgrammatically
                              context={context}
                              col='MINISTERIAL_DECREE' submit='submittedRh2'
                              text={"Upload your ministerial decree of appointment file here"}/>}
                        </div>
                      </Grid>}
                    
                    
                    <Grid xs={12}
                          className="mt-4 mt-md-5 px-2 px-md-0 md:flex flex-flex-1row-reverse justify-end block items-center">
                      <div className='md:inline text-right text-md-left'>
                        <Button onClick={context.updatePaymentMode}
                                disabled={context.state.submittedRh3}
                                color={context.state.submittedRh3 ? 'default' : 'primary'}
                                variant='contained'>
                          <Save
                            size={24}
                            strokeWidth={1}
                          />
                        </Button>
                      </div>
                      <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                                            <span className='hidden md:inline'>
                                            <Icon path={
                                              mdiBankOutline
                                            }
                                                  size={1}
                                            />&nbsp;&nbsp;</span>
                        <span className='mr-2'><FormattedMessage id="Remuneration informations"/></span>
                      </h5>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="Payment mode"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          disabled={
                            context.state.ACTIVED
                          }
                          id="demo-simple-select"
                          value={context.state.PAYMODE}
                          onChange={e => {
                            context.setState({PAYMODE: e.target.value})
                            context.setState({submittedRh3: false})
                          }}>
                          {
                            context.state.payModes?.map(e => (
                              <MenuItem key={e.ABBREV}
                                        value={e.ABBREV}>{e.DESIGNATION}</MenuItem>))
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='ACCOUNT_NUM'
                        value={context.state.ACCOUNT_NUM}
                        disabled={context.state.ACTIVED}
                        label="Account/phone/card number"
                        hint=' '
                        onChange={e => {
                          context.setState({ACCOUNT_NUM: e.target.value, submittedRh3: false})
                        }}
                      />
                      {/*<FormControlInput*/}
                      {/*  label={<FormattedMessage id="Account/phone/card number"/>}*/}
                      {/*  value={context.state.ACCOUNT_NUM}*/}
                      {/*  helperText={<FormattedMessage id="NB: micro-finance accounts are prohibited"/>}*/}
                      {/*  error*/}
                      {/*  disabled={context.state.ACTIVED}*/}
                      {/*  setValue={ACCOUNT_NUM => {*/}
                      {/*    context.setState({ACCOUNT_NUM})*/}
                      {/*    context.setState({submittedRh3: false})*/}
                      {/*  }}*/}
                      {/*/>*/}
                    </Grid>
                    <Grid item xs={12} md={4} style={{minHeight: 32, height: 32}}>
                      <div
                        className='file-item-upload-space flex justify-center items-center'>
                        {context.state.RIB_LINK ? (<div className='flex items-center'>
                          <a href={context.state.RIB_LINK}><FormattedMessage
                            id="RIB attachment"/></a>
                          {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                             style={{height: 32, width: 32}}
                                                             onClick={() => context.removeDiploma('RIB_LINK')}
                          >
                            <Trash2 style={{height: 16}}/>
                          </Avatar>}
                        </div>) : context.state.ACTIVED ? null :
                          <DropzoneProgrammatically
                            context={context}
                            col='RIB_LINK' submit='submittedRh3'
                            text={"Upload your RIB file here"}/>}
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='ACCOUNT_LASTNAME'
                        value={context.state.ACCOUNT_LASTNAME}
                        disabled={context.state.ACTIVED}
                        label="Owner's last name(s)"
                        hint=' '
                        onChange={e => {
                          context.setState({ACCOUNT_LASTNAME: e.target.value, submittedRh3: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='ACCOUNT_FIRSTNAME'
                        value={context.state.ACCOUNT_FIRSTNAME}
                        disabled={context.state.ACTIVED}
                        label="Owner's first name(s)"
                        hint=' '
                        onChange={e => {
                          context.setState({ACCOUNT_FIRSTNAME: e.target.value, submittedRh3: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='ACCOUNT_BIRTHDATE'
                        type='date'
                        value={context.state.ACCOUNT_BIRTHDATE}
                        disabled={context.state.ACTIVED}
                        label="Owner's birth date"
                        hint=' '
                        onChange={e => {
                          context.setState({ACCOUNT_BIRTHDATE: e.target.value, submittedRh3: false})
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </form>
              <div className='col-start-10 col-end-13 pt-5'>
                <h2 className='text-lg  mb-3'>Description</h2>
                <div className='text-black text-opacity-40'>
                  Quant aux informations de rémunération, simplement renseigner les champs demandés.
                </div>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}
