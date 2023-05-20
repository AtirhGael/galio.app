import moment from 'moment'
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import './reactAgendaItem.css';
import {FormattedMessage} from "react-intl";

export default class ReactAgendaItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapper: {
        width: '150px',
        margin: '0 8px',
        zIndex: 5,
        borderLeft: null
        
      },
      controls: {}
      
      
    };
    this.updateDimensions = this.updateDimensions.bind(this)
    this.raiseZindex = this.raiseZindex.bind(this)
    this.lowerZindex = this.lowerZindex.bind(this)
    
  }
  
  updateDimensions() {
    var elem = document.getElementById(this.props.parent)
    if (elem) {
      var nwidh = (elem.offsetWidth / 1.4)
      var nmrgl = this.props.padder > 0
        ? (nwidh / 5) + this.props.padder * 8
        : (nwidh / 5)
      
      return this.setState({
        wrapper: {
          width: nwidh + 'px',
          marginLeft: nmrgl + 'px',
          marginTop: (this.props.padder * 8) + 'px',
          zIndex: 5,
        }
      })
      
    }
    
  }
  
  componentWillReceiveProps(props, next) {
    setTimeout(function () {
      this.updateDimensions();
    }.bind(this), 50);
    
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    
    this.updateDimensions();
    
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  
  lowerZindex() {
    let sty = this.state.wrapper;
    
    if (sty.zIndex === 8) {
      var newState = {wrapper: Object.assign({}, sty, {zIndex: 5})};
      return this.setState(newState)
    }
    
  }
  
  raiseZindex() {
    let sty = this.state.wrapper;
    
    if (sty.zIndex === 5) {
      
      var newState = {wrapper: Object.assign({}, sty, {zIndex: 8})};
      return this.setState(newState)
    }
    
  }
  
  render() {
    
    var duratL = moment(this.props.item.startDateTime).format("HH:mm")
    var duratE = moment(this.props.item.endDateTime).format("HH:mm")
    
    return (
      <div
        style={this.state.wrapper}
        className="agenda-cell-item "
        onMouseEnter={this.raiseZindex}
        onMouseLeave={this.lowerZindex}>
        <div className="agenda-controls-item" style={this.state.controls}>
          {this.props.edit ?
            <div className="agenda-edit-event">
                        <span onClick={() => this.props.edit(this.props.item)} className="agenda-edit-modele">
                            <i className="edit-item-icon"/>
                        </span>
            </div> : ''}
          {this.props.remove ?
            <div className="agenda-delete-event">
                        <span onClick={() => this.props.remove(this.props.item)} className="agenda-delete-modele">
                            <i className="remove-item-icon"/>
                        </span>
            </div> : ''}
        </div>
        <div className="agenda-item-description text-center">
          <p className="px-1">{this.props.item.name}</p>
          <p className="px-1">{this.props.item.Class_Name}</p>
          <p className="px-1">
            <section><FormattedMessage id='Room'/></section>
            <section>{this.props.item.Room_Name || <FormattedMessage id='undefined'/>}</section>
          </p>
          <div className="border-top w-full pt-1 text-center">
            {duratL} - {duratE}
          </div>
        </div>
      </div>)
    
  }
}

ReactAgendaItem.propTypes = {
  parent: PropTypes.string,
  item: PropTypes.object,
  padder: PropTypes.number,
  edit: PropTypes.func,
  remove: PropTypes.func
  
};

ReactAgendaItem.defaultProps = {
  parent: 'body',
  item: {},
  padder: 0
}
