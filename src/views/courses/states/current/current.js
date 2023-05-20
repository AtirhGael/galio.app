import React from "react";
import Item from "../../item";
import {FormattedMessage} from "react-intl";
import {Button, Grid} from "@material-ui/core";
import '../../../../assets/scss/courses.scss'
import {Pagination} from "@material-ui/lab";
import SubjectsS from "../../../../services/subjects.s";
import noDataCourses from "../../../../assets/img/no-data-courses.svg";
import CourseChoises from "./layout/destop/courseChoises";
import CookieH from "../../../../helpers/cookie.h";
import * as _ from "lodash";
import {Search} from "react-feather";
import {GlobalContext} from "../../../../utilities/Global";
import CourseChoicesMobile from "./layout/mobil/courseChoicesMobile";
import CourseFilter from "./layout/destop/courseFilter";
import CourseFilterMobile from "./layout/mobil/courseFilterMobile";

const Context = React.createContext()
export default class Current extends React.Component {
  
  state = {
    CYCLE: '',
    application: {},
    LEVEL: '',
    CLASS_ID: '',
    REGIME: '',
    subjects: [],
    SEARCH: '',
    cycle: [
      {value: 'BENG', min: 1, max: 4},
      {value: 'BSC', min: 1, max: 3},
      {value: 'BTS', min: 1, max: 3},
      {value: 'HND', min: 1, max: 2},
      {value: 'LP', min: 3, max: 3},
      {value: 'CP', min: 1, max: 2},
      {value: 'ESSTIN', min: 1, max: 3},
      {value: 'ING', min: 1, max: 5},
      {value: 'ISU', min: 1, max: 3},
      {value: 'LST', min: 1, max: 3},
      {value: 'PREPA', min: 1, max: 2},
      {value: 'TI', min: 1, max: 2},
      {value: 'BS', min: 1, max: 3},
      {value: '3IL', min: 1, max: 5},
      {value: 'MP', min: 4, max: 5},
      {value: 'BTECH', min: 3, max: 3},
      {value: 'CS2I', min: 3, max: 5},
      {value: 'MengBy', min: 4, max: 5},
      {value: 'MSC', min: 4, max: 5},
    ]
  }
  
  loadData(
    {
      page = this.state.page,
      CLASS = this.state.CLASS_ID,
      CYCLE = this.state.CYCLE,
      LEVEL = this.state.LEVEL,
      REGIME = this.state.REGIME,
      SEARCH = this.state.SEARCH
    }
  ) {
    this.setState({page, CLASS_ID: CLASS, CYCLE, LEVEL, REGIME, SEARCH})
    new SubjectsS().getByLevel({page, CYCLE, LEVEL, REGIME, CLASS, SEARCH}).then(res => {
      if (res.status === 200)
        this.setState({subjects: res.data.rows, count: res.data.count, total: res.data.total})
      else if (res.status === 204)
        this.setState({disabled: true})
    })
  }
  
  componentDidMount() {
    this.loadData({page: this.state.page || 1})
    this.setState({application: CookieH.getApplication()})
  }
  
  canAdd(item, context) {
    let levelConst = this.state.application?.SubjectConstraint['LEVEL' + item.LEVEL_ID + '_' + item.CLASS_ID.split('/')[1].split(' ')[0]]
    let arrayTest = [...context.state.selected, item]
    // console.log(arrayTest, levelConst)
    // if (_.uniqBy(arrayTest, 'SUBJECT_ID').filter(e => e.CLASS_ID === item.CLASS_ID).length > 2)
    if (_.uniqBy(arrayTest.filter(e => e.LEVEL_ID === item.LEVEL_ID), 'SUBJECT_ID').length > levelConst)
      return false
    let totalAdded = _.uniqBy(arrayTest, 'SUBJECT_ID').filter(e => e.LEVEL_ID === item.LEVEL_ID).length || 1
    return {verif: totalAdded <= levelConst, msg: 'ce niveau'}
  }
  
  render() {
    return (
      <GlobalContext.Consumer>
        {context => {
          const checkCategory = (CAT, item) => {
            // const checkCategory = (item) => {
            let selected = context.state.selected
            if (isCategoryChecked(CAT, item)) {
              // if (isCategoryChecked(item)) {
              selected.splice(selected.findIndex(sub => sub.SUBJECT_ID === item.SUBJECT_ID && sub.CAT === CAT), 1)
              // selected.splice(selected.findIndex(sub => sub.SUBJECT_ID === item.SUBJECT_ID), 1)
              context.setState({userAppSession: false})
            } else {
              let newItem = {...item, CAT};
              // let tempSubj = [...context.state.selected, ...context.state.selectedConfirmed, newItem];
              // let sum = _.sum(tempSubj.map(e => e['SUBJECT_VH_' + e.CAT + '_INITIAL']))
              // if (sum <= CookieH.getApplication()?.TOTAL_HOURS) {
              if (this.canAdd(newItem, context)) {
                selected.push(newItem)
                console.log(selected)
                context.setState({userAppSession: false})
              } else
                context.setState({
                  severitySb: 'error',
                  messageSb: "Max number of subjects reached for this level",
                  openSb: true
                })
              // } else {
              //   this.setState({
              //     severity: 'error',
              //     message: "Hourly volume exceeds the one allowed",
              //     open: true
              //   })
              // }
            }
            context.setState({selected})
          }
          
          const isCategoryChecked = (CAT, item) => {
            // const isCategoryChecked = (item) => {
            if (CAT)
              return Boolean(context.state.selected.find(elt => elt?.SUBJECT_ID === item?.SUBJECT_ID && elt.CAT === CAT))
            // return Boolean(context.state.selected.find(elt => elt?.SUBJECT_ID === item?.SUBJECT_ID))
            return Boolean(context.state.selected.find(elt => elt?.SUBJECT_ID === item?.SUBJECT_ID && elt.CAT === 'TD')) && Boolean(context.state.selected.find(elt => elt?.SUBJECT_ID === item?.SUBJECT_ID && elt.CAT === 'CM')) && Boolean(context.state.selected.find(elt => elt?.SUBJECT_ID === item?.SUBJECT_ID && elt.CAT === 'TP'))
          }
          
          return (
            <Context.Provider
              value={{
                state: this.state,
                setState: e => this.setState(e),
                loadData: this.loadData
              }}>
              <div className='relative'>
                <div className='flex md:none'>
                  <CourseChoicesMobile/>
                  <CourseFilterMobile/>
                </div>
                <div className='flex pl-1 align-items-stretch' style={{minHeight: '100vh'}}>
                  <div className='hidden md:block col-md-2'>
                    <CourseFilter/>
                  </div>
                  <div className='col-md-7 px-0' style={{overflowY: 'auto'}}>
                    <div
                      className='mx-md-5 mx-2 shadow flex rounded overflow-hidden bg-white'>
                      <input value={this.state.SEARCH}
                             onChange={e => this.setState({SEARCH: e.target.value})}
                             type="search"
                             placeholder=''
                             className='col py-0 bg-transparent border-0'/>
                      <Button className='col-auto py-1 rounded-0 bg-primary text-white'
                              onClick={() => this.loadData({
                                page: 1,
                                CLASS: '',
                                REGIME: '',
                                CYCLE: '',
                                LEVEL: ''
                              })}>
                        <Search strokeWidth={1}/>
                      </Button>
                    </div>
                    <br/>
                    <br/>
                    <h5 className='mt-4 mb-4 mx-3'><FormattedMessage
                      id="List of subjects"/>
                    </h5>
                    <div style={{minHeight: 450}}>
                      <Grid spacing={1} container className='border-right border-left'>
                        {this.state.subjects?.map((item) => (
                          <Grid item xs={6}>
                            <Item item={item}
                                  isChecked={(CAT) => isCategoryChecked(CAT, item)}
                              // isChecked={() => isCategoryChecked(item)}
                                  check={(CAT) => checkCategory(CAT, item)}/>
                            {/*check={() => checkCategory(item)}/>*/}
                          </Grid>
                        ))}
                        {this.state.subjects?.length === 0 &&
                          <div className='text-center w-full h-full mt-5'>
                            <img src={noDataCourses} className={'w-50'} alt='#'/>
                          </div>
                        }
                      </Grid>
                    </div>
                    <div className='flex justify-center my-md-5 my-3'>
                      <Pagination
                        disabled={this.state.disabled}
                        onChange={(e, value) => this.loadData({page: value})}
                        count={this.state.count || 1}
                        siblingCount={0}/>
                    </div>
                  </div>
                  <div className='hidden md:block col-md-3'>
                    <CourseChoises/>
                  </div>
                </div>
              </div>
            </Context.Provider>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}

export {Context as CourseContext}