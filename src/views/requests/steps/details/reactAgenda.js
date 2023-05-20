import React from 'react';
import {ReactAgenda} from 'react-agenda';
import ReactAgendaItem from "../../../../components/reactAgendaItem/ReactAgendaItem";
import {getMonSunDay} from '../../../../helpers/app.h'
import {GlobalContext} from "../../../../utilities/Global";
import {IntlContext} from "../../../../utilities/Internationalization";
import CookieC from "../../../../constants/cookie.c";

require('moment/locale/fr.js');


let now = new Date();

export default class Agenda extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      cellHeight: 5,
      showModal: false,
      rowsPerHour: 6,
      numberOfDays: 4,
    }
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
  }

  getMonday(date) {
    // let d = new Date(date);
    // var day = d.getDay();
    // let diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
    return new Date(date);
    // return new Date(d.setDate(diff));
  }

  handleCellSelection(item) {
    // this.setState({openAdd: true})
    console.log('handleCellSelection', item)
  }

  handleItemEdit(item) {
    console.log('handleItemEdit', item)
  }

  handleRangeSelection(item) {
    console.log('handleRangeSelection', item)
  }

  render() {
    return (<GlobalContext.Consumer>
        {context => (
          <IntlContext.Consumer>
            {intlContext => (
              <div className='shadow rounded bg-white' style={{height: 500, overflow: 'hidden'}}>
                <ReactAgenda
                  minDate={getMonSunDay(context.state.REQUEST_PBLM_DATE || new Date())[0]}
                  maxDate={now}
                  disablePrevButton={true}
                  startDate={this.getMonday(context.state.REQUEST_PBLM_DATE || new Date())}
                  cellHeight={this.state.cellHeight}
                  locale={intlContext.state.locale === 'fr' ? 'fr' : 'en'}
                  items={this.props.data}
                  numberOfDays={this.state.numberOfDays}
                  rowsPerHour={this.state.rowsPerHour}
                  itemColors={CookieC.COLOR_PLANNING}
                  autoScale={false}
                  itemComponent={data => <ReactAgendaItem item={data.item}/>}
                  startAtTime={8}
                  endAtTime={21.5}
                  fixedHeader={true}
                  // onCellSelect={this.handleCellSelection.bind(this)}
                  // onRangeSelection={this.handleRangeSelection.bind(this)}
                />
              </div>)}
          </IntlContext.Consumer>
        )}
      </GlobalContext.Consumer>
    );
  }
}
