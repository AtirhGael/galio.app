import React from "react";
import TextField from "@material-ui/core/TextField";
import {FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {Clock, RefreshCw, Trash2} from "react-feather";
import {GlobalContext} from "../../../../utilities/Global";
import {weekNumber} from "weeknumber";
import FormatH from "../../../../helpers/format.h";
import {FormattedMessage} from "react-intl";
import Plannings from "./plannings";
import {guid} from "../../../../components/reactAgendaItem/helpers";
import {Button} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import DropzoneProgrammatically from "../../../profile/steps/rh/dropzone/DropzoneProgrammatically";

export default class Details extends React.Component {
  
  hourStart = [
    {id: 0, key: '08:00', text: <>08&nbsp;<sup>h</sup>&nbsp;00</>},
    {id: 2, key: '10:10', text: <>10&nbsp;<sup>h</sup>&nbsp;10</>},
    {id: 4, key: '13:00', text: <>13&nbsp;<sup>h</sup>&nbsp;00</>},
    {id: 6, key: '15:10', text: <>15&nbsp;<sup>h</sup>&nbsp;10</>},
    {id: 8, key: '17:30', text: <>17&nbsp;<sup>h</sup>&nbsp;30</>},
    {id: 10, key: '20:00', text: <>20&nbsp;<sup>h</sup>&nbsp;00</>},
  ]
  hourEnd = [
    {id: 1, key: '09:50', text: <>09&nbsp;<sup>h</sup>&nbsp;50</>},
    {id: 3, key: '12:00', text: <>12&nbsp;<sup>h</sup>&nbsp;00</>},
    {id: 5, key: '14:50', text: <>14&nbsp;<sup>h</sup>&nbsp;50</>},
    {id: 7, key: '17:00', text: <>17&nbsp;<sup>h</sup>&nbsp;00</>},
    {id: 9, key: '19:30', text: <>19&nbsp;<sup>h</sup>&nbsp;30</>},
    {id: 11, key: '21:30', text: <>21&nbsp;<sup>h</sup>&nbsp;30</>},
  ]
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          
          const d = new Date()
          d.setMonth(-3)
          const minRDateArr = d.toLocaleDateString().split('/').map(e => parseInt(e))
          const maxRDateArr = (new Date()).toLocaleDateString().split('/').map(e => parseInt(e))
          
          const overview = (
            startDate,
            endDate,
            pbDate
          ) => {
            
            if (startDate && endDate && pbDate) {
              let date = new Date(pbDate)
              let stD = new Date(date)
              
              stD.setHours(startDate.split(':')[0])
              stD.setMinutes(startDate.split(':')[1])
              
              let enD = new Date(date)
              enD.setHours(endDate.split(':')[0])
              enD.setMinutes(endDate.split(':')[1])
              
              let planningCoursesRequest = [...context.state.planningCoursesRequest]
              let req = planningCoursesRequest.find(req => req.new)
              let newReq = {
                new: true,
                startDateTime: stD,
                endDateTime: enD,
                classes: 'NotValidated',
                _id: guid(),
                name: (
                  <div className='text-center'>
                    <h6>{context.state.REQUEST_OBJECT || 'N/A'}</h6>
                    <div className='small text-lowercase'>{context.state.DESCRIPTION || 'N/A'}</div>
                    <div className='mt-1'><FormattedMessage id='Subject'/></div>
                    [{context.state.SUBJECT_ID || 'N/A'}]
                  </div>
                ),
                Class_Name: context.state?.CLASS_ID || 'N/A',
              }
              
              if (req)
                planningCoursesRequest[planningCoursesRequest.findIndex(req => req.new)] = newReq
              else
                planningCoursesRequest.push(newReq)
              
              context.setState({planningCoursesRequest})
            }
          }
          
          return (
            <Grid container spacing={2}>
              <Grid item xl={context.state.RESQUEST_DISPCONFIG?.TIME_TABLE ? 6 : 12}>
                <br/>
                <h3><FormattedMessage id='Request information'/></h3>
                <FormattedMessage id='Request details description'/>
                <br/>
                <br/>
                <Grid container spacing={3}>
                  {context.state.RESQUEST_DISPCONFIG?.CLASS_ID &&
                    <Grid item xs={3}>
                      <FormControl
                        variant='outlined'
                        fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage
                          id="Academic School"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={context.state.BRANCH_ABREVIATION || ''}
                          onChange={context.handleSetRequestClass}
                          id="demo-simple-select">
                          <MenuItem value='' disabled>Select a school</MenuItem>
                          {context.state.school.map(elt => <MenuItem
                            value={elt?.BRANCH_ABREVIATION}>{elt?.BRANCH_ABREVIATION}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.CLASS_ID &&
                    <Grid item xs={4}>
                      <Autocomplete
                        id="size-small-standard"
                        size="small"
                        className='h-full'
                        onChange={context.handleSetRequestSubject}
                        value={context.state.classSchool.find(e => e.CLASS_NAME === context.state?.CLASS_ID) || ''}
                        options={context.state.classSchool}
                        getOptionLabel={(option) => option?.CLASS_NAME || ""}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            className='h-full'
                            label={<FormattedMessage id="Class"/>}
                            placeholder="Class"/>
                        )}
                      />
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.CLASS_ID &&
                    <Grid item xs={5}>
                      <Autocomplete
                        id="size-small-standard"
                        size="small"
                        onChange={(e, value) => context.setState({SUBJECT_ID: value?.SUBJECT_ID || ''})}
                        options={context.state.subjectClass}
                        value={context.state.subjectClass.find(e => e.SUBJECT_ID === context.state.SUBJECT_ID) || ''}
                        getOptionLabel={(option) => option?.SUBJECT_ID ? (option?.SUBJECT_ID + ' ' + option?.SUBJECT_SHORTNAME) : ""}
                        renderInput={(params) => (
                          <TextField
                            {...params} variant="standard"
                            label={<FormattedMessage id="Subjects"/>}
                            placeholder="Favorites"/>
                        )}
                      />
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.EVENT_DAY &&
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="Date"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={context.state.REQUEST_PBLM_DATE}
                          onChange={e => {
                            context.setState({REQUEST_PBLM_DATE: e.target.value, REQUEST_PBLM_HOUR_START: null})
                          }}
                          id="demo-simple-select">
                          {new Date() < new Date(2021, 8, 21) &&
                            <MenuItem value={'2021-09-21'}>Mardi 21 Septembre 2021</MenuItem>}
                          {new Date() < new Date(2021, 8, 22) &&
                            <MenuItem value={'2021-09-22'}>Mercredi 22 Septembre 2021</MenuItem>}
                          {new Date() < new Date(2021, 8, 23) &&
                            <MenuItem value={'2021-09-23'}>Jeudi 23 Septembre 2021</MenuItem>}
                          {new Date() < new Date(2021, 8, 24) &&
                            <MenuItem value={'2021-09-24'}>Vendredi 24 Septembre 2021</MenuItem>}
                          {new Date() < new Date(2021, 8, 25) &&
                            <MenuItem value={'2021-09-25'}>Samedi 25 Septembre 2021</MenuItem>}
                          {new Date() < new Date(2021, 8, 27) &&
                            <MenuItem value={'2021-09-27'}>Lundi 27 Septembre 2021</MenuItem>}
                        </Select>
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.EVENT_HOUR &&
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="Beginning hour"/></InputLabel>
                        <Select
                          disabled={!context.state.REQUEST_PBLM_DATE}
                          labelId="demo-simple-select-label"
                          value={context.state.REQUEST_PBLM_HOUR_START}
                          onChange={e => {
                            context.setState({REQUEST_PBLM_HOUR_START: e.target.value})
                          }}
                          id="demo-simple-select">
                          {context.state.REQUEST_PBLM_DATE === '2021-09-25' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(9)
                            return new Date() < fullDate
                          })() && <MenuItem value={'09:00'}>09&nbsp;<sup>h</sup>&nbsp;00</MenuItem>}
                          
                          {context.state.REQUEST_PBLM_DATE === '2021-09-25' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(10, 30)
                            return new Date() < fullDate
                          })() && <MenuItem value={'10:30'}>10&nbsp;<sup>h</sup>&nbsp;30</MenuItem>}
                          
                          {context.state.REQUEST_PBLM_DATE !== '2021-09-25' && context.state.REQUEST_PBLM_DATE !== '2021-09-27' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(12)
                            return new Date() < fullDate
                          })() && <MenuItem value={'12:00'}>12&nbsp;<sup>h</sup>&nbsp;00</MenuItem>}
                          
                          {context.state.REQUEST_PBLM_DATE !== '2021-09-25' && context.state.REQUEST_PBLM_DATE !== '2021-09-27' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(17)
                            return new Date() < fullDate
                          })() && <MenuItem value={'17:00'}>17&nbsp;<sup>h</sup>&nbsp;00</MenuItem>}
                          
                          {context.state.REQUEST_PBLM_DATE === '2021-09-27' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(13)
                            return new Date() < fullDate
                          })() && <MenuItem value={'13:00'}>13&nbsp;<sup>h</sup>&nbsp;00</MenuItem>}
                          
                          {context.state.REQUEST_PBLM_DATE === '2021-09-27' && (() => {
                            let fullDate = new Date(context.state.REQUEST_PBLM_DATE)
                            fullDate.setHours(14, 30)
                            return new Date() < fullDate
                          })() && <MenuItem value={'14:30'}>14&nbsp;<sup>h</sup>&nbsp;30</MenuItem>}
                        
                        </Select>
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REQUEST_PBLM_DATE &&
                    <Grid item xs={3}>
                      <TextField
                        type='date'
                        InputProps={{
                          inputProps: {
                            min: minRDateArr[2] + '-' + FormatH.number(minRDateArr[0]) + '-01',
                            max: maxRDateArr[2] + '-' + FormatH.number(maxRDateArr[0]) + '-' + FormatH.number(maxRDateArr[1])
                          }
                        }}
                        value={context.state.REQUEST_PBLM_DATE}
                        InputLabelProps={{shrink: true}}
                        label={<FormattedMessage id="Day"/>} fullWidth
                        helperText={FormatH.date(new Date(context.state.REQUEST_PBLM_DATE))}
                        onChange={e => {
                          overview(context.state.REQUEST_PBLM_HOUR_START, context.state.REQUEST_PBLM_HOUR_END, e.target.value)
                          context.setState({REQUEST_PBLM_DATE: e.target.value})
                        }}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REQUEST_PBLM_DATE &&
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage
                          id="Beginning hour"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={context.state.REQUEST_PBLM_HOUR_START}
                          onChange={e => {
                            overview(e.target.value, context.state.REQUEST_PBLM_HOUR_END, context.state.REQUEST_PBLM_DATE)
                            if (this.hourStart.find(elt => elt.key === e.target.value)?.id > this.hourEnd.find(elt => elt.key === context.state.REQUEST_PBLM_HOUR_END)?.id)
                              context.setState({REQUEST_PBLM_HOUR_END: null})
                            context.setState({REQUEST_PBLM_HOUR_START: e.target.value})
                          }}
                          id="demo-simple-select">
                          {this.hourStart.map(h => <MenuItem key={h.id} value={h.key}>{h.text}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REQUEST_PBLM_DATE &&
                    <Grid item xs={3}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"><FormattedMessage id="Ending hour"/></InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          value={context.state.REQUEST_PBLM_HOUR_END || ''}
                          onChange={e => {
                            overview(context.state.REQUEST_PBLM_HOUR_START, e.target.value, context.state.REQUEST_PBLM_DATE)
                            context.setState({REQUEST_PBLM_HOUR_END: e.target.value})
                          }}
                          id="demo-simple-select">
                          {this.hourEnd.filter(f => this.hourStart.find(h => h.key === context.state.REQUEST_PBLM_HOUR_START)?.id < f.id).map(h =>
                            <MenuItem key={h.id} value={h.key}>{h.text}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REQUEST_PBLM_DATE &&
                    <Grid item xs={3}>
                      <TextField label={<FormattedMessage id="Week N°"/>} disabled fullWidth
                                 value={weekNumber(new Date(context.state.REQUEST_PBLM_DATE))}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.CONTRACT_NUMBER &&
                    <Grid item xs={4}>
                      <TextField
                        label={<FormattedMessage id="Contract number"/>} fullWidth
                        onChange={e => context.setState({CONTRACT_NUMBER: e.target.value})}
                        value={context.state.CONTRACT_NUMBER}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.VH_DISPLAYED &&
                    <Grid item xs={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="standard-adornment-password"><FormattedMessage
                          id="Hourly volume noted"/></InputLabel>
                        <Input
                          value={context.state.VH_DISPLAYED}
                          type="number" onChange={e => {
                          context.setState({VH_DISPLAYED: e.target.value})
                        }}
                          id="standard-adornment-password"
                          endAdornment={<InputAdornment position="end"><Clock
                            size="18"/></InputAdornment>}
                        />
                      </FormControl>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.VH_EXPECTED &&
                    <Grid item xs={6}>
                      <TextField
                        value={context.state.VH_EXPECTED}
                        label={<FormattedMessage id="Hourly volume expected"/>} fullWidth
                        onChange={e => {
                          context.setState({VH_EXPECTED: e.target.value})
                        }}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.TH_DISPLAYED &&
                    <Grid item xs={6}>
                      <TextField
                        label={<FormattedMessage id="Hourly rate noted"/>}
                        fullWidth
                        onChange={e => context.setState({TH_DISPLAYED: e.target.value})}
                        value={context.state.TH_DISPLAYED}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.TH_DISPLAYED &&
                    <Grid item xs={6}>
                      <TextField
                        label={<FormattedMessage id="Hourly rate expected"/>}
                        onChange={e => context.setState({TH_EXPECTED: e.target.value})}
                        value={context.state.TH_EXPECTED} fullWidth/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.TI_DISPLAYED &&
                    <Grid item xs={6}>
                      <TextField
                        label={<FormattedMessage id="Tax rate noted"/>} fullWidth
                        onChange={e => context.setState({TI_DISPLAYED: e.target.value})}
                        value={context.state.TI_DISPLAYED}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.TI_EXPECTED &&
                    <Grid item xs={6}>
                      <TextField
                        label={<FormattedMessage id="Tax rate expected"/>}
                        onChange={e => context.setState({TI_EXPECTED: e.target.value})}
                        value={context.state.TI_EXPECTED} fullWidth/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.AMOUNT_RECEIVED &&
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label={<FormattedMessage id="Ammount received"/>} fullWidth
                        onChange={e => context.setState({AMOUNT_RECEIVED: e.target.value})}
                        value={context.state.AMOUNT_RECEIVED}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.AMOUNT_EXPECTED &&
                    <Grid item xs={6}>
                      <TextField
                        type="number"
                        label={<FormattedMessage id="Ammount expected"/>}
                        onChange={e => context.setState({AMOUNT_EXPECTED: e.target.value})}
                        value={context.state.AMOUNT_EXPECTED} fullWidth/>
                    </Grid>}
                  <Grid item xs={12}>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled={context.state.RESQUEST_DISPCONFIG?.EVENT_DAY}
                      label={<FormattedMessage id="Request title"/>}
                      variant="outlined"
                      fullWidth
                      onChange={e => context.setState({REQUEST_OBJECT: e.target.value})}
                      value={context.state.REQUEST_OBJECT || ""}
                      className=""/>
                  </Grid>
                  {context.state.RESQUEST_DISPCONFIG?.FILE &&
                    <Grid item xs={2}>
                      {context.state.REQUEST_FILE ? (
                          <div className='flex whitespace-nowrap items-center pr-5'>
                            <a href={context.state.REQUEST_FILE} className='flex-1 rounded border border-gray-400 py-4 pl-5 block'><FormattedMessage id="Attachment file"/></a>
                            {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                               style={{height: 32, width: 32}}
                                                               onClick={() => context.setState({REQUEST_FILE: null})}
                            >
                              <Trash2 style={{height: 16}}/>
                            </Avatar>}
                          </div>
                        ) :
                        <div className='py-4 rounded border-gray-400 border'>
                          <DropzoneProgrammatically
                            context={context}
                            col='REQUEST_FILE'/>
                        </div>}
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REPRO_COPY_NUMBER &&
                    <Grid item xs={2}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label={<FormattedMessage id="Nombre de copies"/>} fullWidth
                        onChange={e => context.setState({REPRO_COPY_NUMBER: e.target.value})}
                        value={context.state.REPRO_COPY_NUMBER}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.REPRO_STUDENT_COUNT &&
                    <Grid item xs={2}>
                      <TextField
                        variant="outlined"
                        type="number"
                        label={<FormattedMessage id="Effectifs"/>} fullWidth
                        onChange={e => context.setState({REPRO_STUDENT_COUNT: e.target.value})}
                        value={context.state.REPRO_STUDENT_COUNT}/>
                    </Grid>}
                  {context.state.RESQUEST_DISPCONFIG?.DESCRIPTION &&
                    <Grid item xs={12}>
                      <TextField
                        disabled={context.state.RESQUEST_DISPCONFIG?.EVENT_DAY}
                        label={<FormattedMessage id="Request description"/>}
                        multiline
                        rows={5}
                        required={true}
                        variant="filled"
                        fullWidth
                        onChange={e => context.setState({DESCRIPTION: e.target.value})}
                        value={context.state.DESCRIPTION}
                        className=""/>
                    </Grid>}
                </Grid>
              </Grid>
              {context.state.RESQUEST_DISPCONFIG?.TIME_TABLE &&
                <Grid item xl={6}>
                  <div className='relative'>
                    <Plannings/>
                    <Button
                      onClick={() => overview(context.state.REQUEST_PBLM_HOUR_START, context.state.REQUEST_PBLM_HOUR_END, context.state.REQUEST_PBLM_DATE)}
                      className='bg-primary shadow absolute'
                      style={{top: 0, right: '-24px'}}>
                      <RefreshCw size={18}/> <FormattedMessage id='Refresh'/>
                    </Button>
                  </div>
                </Grid>}
            </Grid>
          )
        }}
      </GlobalContext.Consumer>
    );
  }
}
