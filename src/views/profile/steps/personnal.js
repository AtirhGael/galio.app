import React from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import flag from '../../../assets/data/flags.json'
import {Grid} from '@material-ui/core';
import {Save, User} from "react-feather";
import {GlobalContext} from "../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import GInput from "../../../components/gInput";

export default class Personnal extends React.Component {
  state = {
    submitePerso: true
  }
  
  render() {
    const genders = [
      {key: 'M', value: 'Masculine - Male'},
      {key: 'F', value: 'Feminin - Female'},
    ]
    
    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className='grid max-w-screen-lg mx-auto gap-x-8 pt-5'>
              <form onSubmit={(e) => {
                e.preventDefault()
                context.updatePersonal()
              }} className='text-left col-start-1 col-end-10'>
                <div className="md:flex flex-row-reverse justify-end block items-center">
                  <div className='md:inline text-right text-md-left'>
                    <button
                      type="submit"
                      disabled={context.state.submitePerso}
                      color={context.state.submitePerso ? 'default' : 'primary'}
                      className='bg-white p-2 rounded-full border border-green-300 shadow-lg mb-2.5 disabled:shadow-none disabled:bg-gray-300 hover:bg-gray-50 cursor-pointer disabled:cursor-auto transition-all'
                    >
                      <Save size={20} strokeWidth={1} color='green'/>
                    </button>
                  </div>
                  <h5 className='mt-3 mb-3 flex items-start mr-1 px-0'>
                    <span className='hidden md:inline mr-3'><User/>&nbsp;&nbsp;</span>
                    <span className='mr-2 text-nowrap text-lg'><FormattedMessage id={'Personal informations'}/></span>
                  </h5>
                </div>
                <div>
                  <Grid container spacing={3} className="pt-3">
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='lastname'
                        value={context.state.LASTNAME}
                        disabled={context.state.ACTIVED}
                        label='Last name(s)'
                        hint='Nom tel que ecrit sur votre cni'
                        onChange={e => {
                          context.setState({LASTNAME: e.target.value})
                          if (context.state.submitePerso)
                            context.setState({submitePerso: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='firstname'
                        value={context.state.FIRSTNAME}
                        disabled={context.state.ACTIVED}
                        label='First names(s)'
                        hint='Prenom tel que ecrit sur votre cni'
                        onChange={e => {
                          context.setState({FIRSTNAME: e.target.value})
                          if (context.state.submitePerso)
                            context.setState({submitePerso: false})
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className='-mt-1'>
                        <label id="demo-simple-select-label"><FormattedMessage id={'Gender'}/></label>
                        <select
                          className='w-full py-2 disabled:bg-gray-100 px-2 bg-white rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                          value={context.state.GENDER}
                          disabled={context.state.ACTIVED}
                          onChange={e => {
                            context.setState({GENDER: e.target.value})
                            if (context.state.submitePerso)
                              context.setState({submitePerso: false})
                          }}
                        >
                          {genders.map(gender => <option
                            value={gender.key} key={gender.key}>{gender.value}</option>)}
                        </select>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className="-mt-1">
                        <label className='ml-1'><FormattedMessage id={'Country'}/></label>
                        <Autocomplete
                          options={flag.map(e => e.name)}
                          disabled={context.state.ACTIVED}
                          clearOnEscape
                          className={`w-full peer ${context.state.ACTIVED ? 'bg-gray-100' : 'bg-white'} invalid:border-red-300 invalid:bg-red-50 invalid:bg-opacity-20 py-2 px-4 rounded focus:shadow-lg focus:valid:border-blue-300 focus:shadow-blue-50 border-gray-100 border`}
                          label={<FormattedMessage id={'Nationality'}/>}
                          value={flag.find(e => e.name === context.state.COUNTRY).name}
                          onChange={(e, object) => {
                            context.setState({COUNTRY: object})
                            context.setState({submitePerso: false})
                          }}
                          renderOption={option => {
                            return (
                              <div className='flex text-xs'>
                                <img
                                  className='w-6 mr-2'
                                  src={flag.find(e => e.name === option).file_url}
                                  alt=""/>
                                {option + ' - ' + flag.find(e => e.name === option).alpha3}
                              </div>
                            )
                          }}
                          renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                              <input type="text" {...params.inputProps} />
                            </div>
                          )}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <div className='-mt-1'>
                        <label id="demo-simple-select-label"><FormattedMessage id={'Birth date'}/></label>
                        <input
                          value={context.state.BIRTHDATE}
                          className='w-full py-2 px-4 rounded-md focus:shadow-lg focus:border-blue-300  focus:shadow-blue-50 border-gray-100 border'
                          disabled={context.state.ACTIVED}
                          type="date"
                          onChange={e => {
                            context.setState({BIRTHDATE: e.target.value})
                            if (context.state.submitePerso)
                              context.setState({submitePerso: false})
                          }}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <GInput
                        id='birthplace'
                        value={context.state.BIRTHPLACE}
                        disabled={context.state.ACTIVED}
                        label='Birth place'
                        hint="Nom de la localite tel que l'acte de naissance"
                        onChange={e => {
                          context.setState({BIRTHPLACE: e.target.value})
                          if (context.state.submitePerso)
                            context.setState({submitePerso: false})
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              </form>
              <div className='col-start-10 col-end-13 pt-5'>
                <h2 className='text-lg  mb-3'>Description</h2>
                <div className='text-black text-opacity-40'>
                  Certain essential elements must be present before a written contract is binding, including:
                  identification (names) of the parties, the purpose of the agreement, a detailed statement of the
                  rights and obligations of each party, what each party is giving
                </div>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}
