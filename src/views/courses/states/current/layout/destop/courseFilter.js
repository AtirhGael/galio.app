import React from 'react'
import {FormattedMessage} from "react-intl";
import {Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select} from "@material-ui/core";
import {CourseContext} from "../../current";
import {GlobalContext} from "../../../../../../utilities/Global";

const CourseFilter = () => {
  return (
    <GlobalContext.Consumer>
      {context => {
        return (
          <CourseContext.Consumer>
            {courseContext => {
              return (
                <div className='md:block pl-md-4' style={{overflowY: 'auto'}}>
                  <h6 className='mb-0 mt-4'><FormattedMessage id="Filter options"/></h6>
                  <FormControl component="fieldset" className='mt-3'
                               disabled={true || courseContext.state.disabled}>
                    <FormLabel component="legend"><FormattedMessage id="Languages"/></FormLabel>
                    <RadioGroup name="gender1" value={courseContext.state.language} defaultValue={'all'}
                                onChange={e => courseContext.setState({language: e.target.value})}>
                      <FormControlLabel value="all" control={<Radio className='py-1'/>}
                                        label="Toutes"
                                        className='my-0'/>
                      <FormControlLabel value="fr" control={<Radio className='py-1'/>}
                                        label="Français"
                                        className='my-0'/>
                      <FormControlLabel value="en" control={<Radio className='py-1'/>}
                                        label="Anglais"
                                        className='my-0'/>
                    </RadioGroup>
                  </FormControl>
                  <FormControl component="fieldset" className='mt-3' disabled={courseContext.state.disabled}>
                    <FormLabel component="legend"><FormattedMessage id="Shift regimes"/></FormLabel>
                    <RadioGroup name="gender1" value={courseContext.state.REGIME} defaultValue={''}
                                onChange={e => courseContext.setState({REGIME: e.target.value})}>
                      <FormControlLabel value=""
                                        control={<Radio className='py-1'/>} /*label="Tous"*/
                                        label={<FormattedMessage id="All"/>}
                                        className='my-0'/>
                      <FormControlLabel value="J"
                                        control={<Radio className='py-1'/>} /*label="Jour"*/
                                        label={<FormattedMessage id="Morning"/>}
                                        className='my-0'/>
                      <FormControlLabel value="S"
                                        control={<Radio className='py-1'/>} /*label="Soir"*/
                                        label={<FormattedMessage id="Evening"/>}
                                        className='my-0'/>
                    </RadioGroup>
                  </FormControl>
                  <FormControl fullWidth variant='outlined' className='mt-4'
                               disabled={courseContext.state.disabled}>
                    <FormLabel><FormattedMessage id="Cycle"/></FormLabel>
                    <Select
                      displayEmpty
                      value={courseContext.state.CYCLE || ''}
                      onChange={e => courseContext.setState({CYCLE: e.target.value})}
                      className='small'
                    >
                      <MenuItem disabled className='small'><FormattedMessage
                        id="Select a cycle"/></MenuItem>
                      <MenuItem value="" className='small'><FormattedMessage
                        id="All cycles"/></MenuItem>
                      {courseContext.state.cycle.map(c => (
                        <MenuItem value={c.value} className='small'>{c.value}</MenuItem>))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth variant='outlined' className='mt-4'
                               disabled={courseContext.state.disabled}>
                    <FormLabel>Niveau</FormLabel>
                    <Select
                      displayEmpty
                      value={courseContext.state.LEVEL || ''}
                      onChange={e => courseContext.setState({LEVEL: e.target.value})}
                    >
                      <MenuItem value=""><FormattedMessage id="All levels"/></MenuItem>
                      {((courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.min <= 1 &&
                          courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.max >= 1) || courseContext.state.CYCLE === '') &&
                        <MenuItem value={1}><FormattedMessage id="Level 1"/></MenuItem>}
                      
                      {((courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.min <= 2 &&
                          courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.max >= 2) || courseContext.state.CYCLE === '') &&
                        <MenuItem value={2}><FormattedMessage id="Level 2"/></MenuItem>}
                      
                      {((courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.min <= 3 &&
                          courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.max >= 3) || courseContext.state.CYCLE === '') &&
                        <MenuItem value={3}><FormattedMessage id="Level 3"/></MenuItem>}
                      
                      {((courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.min <= 4 &&
                          courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.max >= 4) || courseContext.state.CYCLE === '') &&
                        <MenuItem value={4}><FormattedMessage id="Level 4"/></MenuItem>}
                      
                      {((courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.min <= 5 &&
                          courseContext.state.cycle?.find(cy => cy?.value === courseContext.state.CYCLE)?.max >= 5) || courseContext.state.CYCLE === '') &&
                        <MenuItem value={5}><FormattedMessage id="Level 5"/></MenuItem>}
                    </Select>
                  </FormControl>
                  <div>
                    {/*    <FormControl fullWidth variant='outlined' className='mt-4'>*/}
                    {/*        <FormLabel><FormattedMessage id="Class"/></FormLabel>*/}
                    {/*        <Select*/}
                    {/*            displayEmpty*/}
                    {/*            value={courseContext.state.CLASS_ID || ''}*/}
                    {/*            onChange={e => courseContext.setState({CLASS_ID: e.target.value})}*/}
                    {/*        >*/}
                    {/*            <MenuItem value=""><FormattedMessage id="All classes"/></MenuItem>*/}
                    {/*            {context.state.CLASSES.filter(e => e.CLASS_ID.indexOf(courseContext.state.CYCLE) === 0 && parseInt(e.LEVEL_ID) === courseContext.state.LEVEL && e.CLASS_ID.includes('/' + courseContext.state.REGIME)).map(cla => (*/}
                    {/*                <MenuItem value={cla.CLASS_ID}>{cla.CLASS_ID}</MenuItem>))}*/}
                    {/*        </Select>*/}
                    {/*    </FormControl>*/}
                    
                    <Button
                      className='w-full bg-primary text-white mt-4'
                      onClick={() => courseContext.loadData({page: 1, SEARCH: ''})
                      }><FormattedMessage id="Filter"/></Button>
                    <Button
                      className='w-full bg-danger text-white mt-3'
                      onClick={() => {
                        courseContext.setState({LEVEL: '', REGIME: '', CYCLE: ''})
                      }}><FormattedMessage id="Reset"/></Button>
                  </div>
                </div>
              )
            }}
          </CourseContext.Consumer>
        )
      }}
    </GlobalContext.Consumer>
  )
}
export default CourseFilter