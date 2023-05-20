import React, {useContext} from 'react'
import Icon from "@mdi/react";
import {mdiAccountSupervisorCircleOutline, mdiBabyFaceOutline} from "@mdi/js";
import {Grid} from "@material-ui/core";
import {Save} from "react-feather";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import GInput from "../../../components/gInput";

export default function Familial() {
  const context = useContext(GlobalContext)
  const civilState = [
    {key: 'Single', value: 'Célibataire - Single'},
    {key: 'Married', value: 'Marié(e) - Married'},
    {key: 'Divorced', value: 'Divorcé(e) - Divorced'},
    {key: 'Widow', value: 'Veuf(ve) - Widow(er)'},
  ]
  return (
    <div className='grid max-w-screen-lg mx-auto gap-x-8 pt-5'>
      <form onSubmit={(e) => {
        e.preventDefault()
        context.updateFamilial()
      }} className="text-left col-start-1 col-end-11">
        <div className="md:flex flex-row-reverse justify-end block items-center">
          <div className='md:inline text-right text-md-left'>
            <button
              type="submit"
              disabled={context.state.submiteFamily}
              className='bg-white p-2 rounded-full border border-green-300 shadow-lg mb-2.5 disabled:shadow-none disabled:bg-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-auto transition-all'
              color={context.state.submiteFamily ? 'default' : 'primary'}
            >
              <Save size={20} strokeWidth={1} color='green'/>
            </button>
          </div>
          <h5 className='mt-3 mb-3 flex items-start mr-1 px-0'>
            <span className='hidden md:inline mr-3'><Icon path={mdiAccountSupervisorCircleOutline}
                                                          size={1}/>&nbsp;&nbsp;</span>
            <span className='mr-2 text-nowrap text-lg'><FormattedMessage id={'Family status'}/></span>
          </h5>
        </div>
        <Grid container spacing={3} className="pt-3">
          <Grid item xs={6} md={3}>
            <div className='-mt-1'>
              <label id="demo-simple-select-label"><FormattedMessage id={'Civil status'}/></label>
              <select
                className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                value={context.state.CIVILSTATUS}
                disabled={context.state.ACTIVED}
                onChange={e => {
                  if (e.target.value !== 'Married') {
                    context.setState({SPLASTNAME: ''})
                    context.setState({SPFIRSTNAME: ''})
                  }
                  
                  if (context.state.submiteFamily)
                    context.setState({submiteFamily: false})
                  context.setState({CIVILSTATUS: e.target.value})
                }}
              >
                <option>Status</option>
                {civilState.map(elt => <option value={elt.key} key={elt.key}>{elt.value}</option>)}
              </select>
            </div>
          </Grid>
          <Grid item xs={6} md={2}>
            <GInput
              id='children'
              type='number'
              value={context.state.CHILDNUM}
              disabled={context.state.ACTIVED}
              label='Children count'
              hint=' '
              EndIcon={mdiBabyFaceOutline}
              onKeyDown={e => {
                if (['-', 'e', '+', ',', '.'].includes(e.key))
                  e.preventDefault()
              }}
              onChange={e => {
                if (e.target.value >= 0) {
                  context.setState({CHILDNUM: e.target.value})
                  if (context.state.submiteFamily)
                    context.setState({submiteFamily: false})
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <GInput
              id='EMERGNAME1'
              value={context.state.EMERGNAME1}
              disabled={context.state.ACTIVED}
              label='Emergency contact name'
              hint=' '
              onChange={e => {
                context.setState({EMERGNAME1: e.target.value})
                if (context.state.submiteFamily)
                  context.setState({submiteFamily: false})
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GInput
              id='EMERGNUM1'
              value={context.state.EMERGNUM1}
              disabled={context.state.ACTIVED}
              label='Emergency contact number'
              type='number'
              hint=' '
              startIcon='+237 - '
              onKeyDown={e => {
                if (['-', 'e', '+', ',', '.'].includes(e.key))
                  e.preventDefault()
              }}
              onChange={e => {
                if (e.target.value.length <= 9)
                  context.setState({EMERGNUM1: e.target.value})
                
                if (context.state.submiteFamily)
                  context.setState({submiteFamily: false})
              }}
            />
            {/*  InputProps={{*/}
            {/*    startAdornment: <InputAdornment position="start">+237 - </InputAdornment>,*/}
            {/*  }}*/}
          </Grid>
          {context.state.CIVILSTATUS === 'Married' &&
            <Grid item xs={12} md={4}>
              <GInput
                id='SPLASTNAME'
                value={context.state.SPLASTNAME}
                disabled={context.state.ACTIVED}
                label="Spouse's (maiden) last name"
                hint=' '
                onChange={e => {
                  context.setState({SPLASTNAME: e.target.value})
                  if (context.state.submiteFamily)
                    context.setState({submiteFamily: false})
                }}
              />
            </Grid>}
          {context.state.CIVILSTATUS === 'Married' &&
            <Grid item xs={12} md={4}>
              <GInput
                id='SPFIRSTNAME'
                value={context.state.SPFIRSTNAME}
                disabled={context.state.ACTIVED}
                label="Spouse's first name"
                hint=' '
                onChange={e => {
                  context.setState({SPFIRSTNAME: e.target.value})
                  if (context.state.submiteFamily)
                    context.setState({submiteFamily: false})
                }}
              />
            </Grid>}
          {context.state.CIVILSTATUS === 'Married' &&
            <Grid item xs={12} md={4}>
              <GInput
                id='SPFIRSTNAME'
                value={context.state.SPBIRTHDATE}
                disabled={context.state.ACTIVED}
                label="Spouse's birth date"
                type="date"
                hint=' '
                onChange={e => {
                  context.setState({SPBIRTHDATE: e.target.value})
                  if (context.state.submiteFamily)
                    context.setState({submiteFamily: false})
                }}
              />
            </Grid>}
        </Grid>
      </form>
      <div className='col-start-11 col-end-13 pt-5'>
        <h2 className='text-lg  mb-3'>Description</h2>
        <div className='text-black text-opacity-40'>The Code defines “family status” as “being in a parent and child
          relationship.” This can also mean a parent and child “type” of relationship, that may not be based on blood or
          adoption ties, but that is based on care, responsibility and commitment
        </div>
      </div>
    </div>
  )
}
