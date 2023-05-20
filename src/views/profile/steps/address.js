import React from 'react'
import Icon from "@mdi/react";
import {mdiContactsOutline} from "@mdi/js";
import Autocomplete from "@material-ui/lab/Autocomplete";
import towns from '../../../assets/data/towns.json'
import {Grid} from "@material-ui/core";
import {Save} from "react-feather";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import GInput from "../../../components/gInput";
import flag from "../../../assets/data/flags.json";

export default function Address() {
  
  const regions = [
    {key: "north", text: "North"},
    {key: "south", text: "South"},
    {key: "east", text: "East"},
    {key: "west", text: "West"},
    {key: "adamaoua", text: "Adamaoua"},
    {key: "south-west", text: "South-West"},
    {key: "north-west", text: "North-West"},
    {key: "extreme-north", text: "Extreme-North"},
    {key: "center", text: "Center"},
    {key: "littoral", text: "Littoral"},
  ]
  return (
    <GlobalContext.Consumer>
      {context => {
        return (
          <div className='grid max-w-screen-lg mx-auto gap-x-8 pt-5'>
            <form onSubmit={(e) => {
              e.preventDefault()
              context.updateAddress()
            }} className='text-left col-start-1 col-end-10'>
              <div className="md:flex flex-row-reverse justify-end block items-center">
                <div className='md:inline text-right text-md-left'>
                  <button
                    type="submit"
                    disabled={context.state.submitteAdress}
                    color={context.state.submitePerso ? 'default' : 'primary'}
                    className='bg-white p-2 rounded-full border border-green-300 shadow-lg mb-2.5 disabled:shadow-none disabled:bg-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-auto transition-all'
                  >
                    <Save size={20} strokeWidth={1} color='green'/>
                  </button>
                </div>
                <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                                    <span className='hidden md:inline'><Icon path={mdiContactsOutline}
                                                                             size={1}/>&nbsp;&nbsp;</span>
                  <span className='mr-2'><FormattedMessage id={'Address and contacts'}/></span>
                </h5>
              </div>
              <Grid container spacing={3} className="pt-3">
                <Grid item xs={12} md={4}>
                  <GInput
                    id='phoneNumbe'
                    vaCenterlue={context.state.NUMPHONE}
                    disabled={context.state.ACTIVED}
                    label='First phone number'
                    hint=' '
                    onKeyDown={e => {
                      if (['-', 'e', ',', '.'].includes(e.key))
                        e.preventDefault()
                    }}
                    onChange={e => {
                      if (e.target.value.length <= 9)
                        context.setState({NUMPHONE: e.target.value})
                      if (context.state.submitteAdress)
                        context.setState({submitteAdress: false})
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <GInput
                    id='phoneNumbe2'
                    value={context.state.NUMPHONE2}
                    disabled={context.state.ACTIVED}
                    label='Second phone number'
                    hint=' '
                    onKeyDown={e => {
                      if (['-', 'e', ',', '.'].includes(e.key))
                        e.preventDefault()
                    }}
                    onChange={e => {
                      if (e.target.value.length <= 9)
                        context.setState({NUMPHONE2: e.target.value})
                      if (context.state.submitteAdress)
                        context.setState({submitteAdress: false})
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <div className='-mt-1'>
                    <label id="demo-simple-select-label"><FormattedMessage id={'Region d\'origine'}/></label>
                    <select
                      className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                      value={context.state.ORIGIN_REGION}
                      disabled={context.state.ACTIVED}
                      onChange={e => {
                        context.setState({ORIGIN_REGION: e.target.value})
                        if (context.state.submitteAdress)
                          context.setState({submitteAdress: false})
                      }}
                    >
                      <option>Selection a region</option>
                      {regions.map(region => <option value={region.key} key={region.key}>{region.text}</option>)}
                    </select>
                  </div>
                </Grid>
                {/*<Grid item xs={12} md={4}>*/}
                {/*    <TextField*/}
                {/*        label={<FormattedMessage id={'Email address'}/>}*/}
                {/*        type='email'*/}
                {/*        fullWidth*/}
                {/*        value={context.state.EMAIL}*/}
                {/*        disabled*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={12} md={4}>
                  <div className="-mt-1">
                    <label className='ml-1'><FormattedMessage id={'Living town'}/></label>
                    <Autocomplete
                      options={towns.map(e => e.name)}
                      disabled={context.state.ACTIVED}
                      clearOnEscape
                      className={`w-full peer ${context.state.ACTIVED ? 'bg-gray-100' : 'bg-white'} invalid:border-red-300 invalid:bg-red-50 invalid:bg-opacity-20 py-2 px-4 rounded focus:shadow-lg focus:valid:border-blue-300 focus:shadow-blue-50 border-gray-100 border`}
                      label={<FormattedMessage id={'Nationality'}/>}
                      value={towns.find(e => e.name === context.state.TOWN)?.name}
                      onChange={(e, object) => {
                        context.setState({submitteAdress: false, TOWN: object})
                      }}
                      renderOption={option => {
                        return (
                          <div className='flex text-xs'>
                            <img
                              className='w-6 mr-2'
                              src={flag.find(e => e.name === option)?.file_url}
                              alt=""/>
                            {option + ' - ' + flag.find(e => e.name === option)?.alpha3}
                          </div>
                        )
                      }}
                      renderInput={(params) => (
                        <div ref={params.InputProps?.ref}>
                          <input type="text" {...params.inputProps} />
                        </div>
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={6} md={4}>
                  <GInput
                    id='address'
                    value={context.state.DISTRICT}
                    disabled={context.state.ACTIVED}
                    label='District'
                    hint=' '
                    onChange={e => {
                      context.setState({DISTRICT: e.target.value})
                      if (context.state.submitteAdress)
                        context.setState({submitteAdress: false})
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <GInput
                    id='address'
                    value={context.state.PRECINCT}
                    disabled={context.state.ACTIVED}
                    label='Precinct'
                    hint=' '
                    onChange={e => {
                      context.setState({PRECINCT: e.target.value})
                      if (context.state.submitteAdress)
                        context.setState({submitteAdress: false})
                    }}
                  />
                </Grid>
              </Grid>
            </form>
            <div className='col-start-10 col-end-13 pt-5'>
              <h2 className='text-lg  mb-3'>Description</h2>
              <div className='text-black text-opacity-40'>Dans le menu de la situation familiale ci-après, la seconde
                ligne n’apparait que si le choix du premier
                champ est « Marié(e) ». Des informations sommaires sur le/la conjoint(e) y sont alors requises.
              </div>
            </div>
          </div>
        )
      }}
    </GlobalContext.Consumer>
  )
}
