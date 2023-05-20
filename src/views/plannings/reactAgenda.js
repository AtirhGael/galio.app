import React from 'react';
import {ReactAgenda} from 'react-agenda';
import ReactAgendaItem from "../../components/reactAgendaItem/ReactAgendaItem";
import {getMonSunDay} from '../../helpers/app.h'
import 'moment/locale/fr.js';
import CookieC from "../../constants/cookie.c";

let now = new Date();

export default class Agenda extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      cellHeight: 10,
      showModal: false,
      locale: "fr",
      rowsPerHour: 6,
      numberOfDays: 7,
    }
    this.handleCellSelection = this.handleCellSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this)
  }
  
  getMonday() {
    let d = new Date();
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
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
    let date = new Date()
    return (
      <div>
        <ReactAgenda
          minDate={getMonSunDay(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))[0]}
          maxDate={getMonSunDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10))[1]}
          disablePrevButton={true}
          startDate={this.getMonday()}
          cellHeight={this.state.cellHeight}
          locale={this.state.locale}
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
      </div>
    );
  }
}
