import React from "react"
import {FormattedDate, FormattedMessage} from "react-intl";
import {
  Card,
  CardBody,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  UncontrolledDropdown,
} from "reactstrap"
import {ChevronDown, RefreshCw} from "react-feather"
import {Button, Grid, Tooltip} from "@material-ui/core";
import {AgGridReact} from "ag-grid-react";
import {withStyles} from "@material-ui/core/styles";
import FormatH from "../../../helpers/format.h";
import {GlobalContext} from "../../../utilities/Global";
import {decode} from 'url-encode-decode'
import Details from "./details";
import "../../../assets/scss/bootstrap.scss";
import "../../../assets/scss/_agGridStyleOverride.scss";
import "../../../assets/scss/users.scss";

export default class RecentRequests extends React.Component {
  state = {
    open: false,
    openDialog: false,
    eltToDelete: '',
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    totalDone: 0,
    totalClose: 0,
    totalRegistered: 0,
    totalProcessing: 0,
    totalRejected: 0,
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "#",
        field: "REQUEST_ID",
        width: 100,
        filter: true,
        cellRendererFramework: params => (<Details REQUEST_ID={params.value}/>)
      },
      {
        headerName: "Identifier",
        field: "REQUEST_ID",
        width: 150,
        filter: true,
      },
      {
        headerName: "Object",
        field: "REQUEST_OBJECT",
        width: 300,
        filter: true,
        cellRendererFramework: params => params.value === 'N/A' ?
          <div className="badge badge-dark w-full py-2">Empty object</div> :
          <div className="badge badge-light w-full py-2">{params.value.toUpperCase()}</div>
      },
      {
        headerName: "Description",
        field: "DESCRIPTION",
        width: 300,
        filter: true,
        cellRendererFramework: params => decode(params.value)
      },
      {
        headerName: "Category",
        field: "RequestCategory",
        width: 300,
        filter: true,
        cellRendererFramework: params => params.data.RequestCategory?.S_CATEGORIE || ''
      },
      {
        headerName: "Status",
        field: "RequestStep",
        width: 200,
        filter: true,
        cellRendererFramework: params => params.data.RequestStep ?
          <div> {params.value?.RSTEP_STATUS === 'PROCESSING' ? (
            <div className="badge badge-warning w-full py-2">{params.value?.RSTEP_STATUS}</div>
          ) : params.value?.RSTEP_STATUS === 'VALIDATED' ? (
            <div className="badge badge-success w-full py-2 ">{params.value?.RSTEP_STATUS}</div>
          ) : params.value?.RSTEP_STATUS === 'REJECTED' ? (
            <div className="badge badge-danger w-full py-2 ">{params.value?.RSTEP_STATUS}</div>
          ) : <div className="badge badge-info w-full py-2">REGISTRED</div>}
          </div> : <div className="badge badge-info w-full py-2">REGISTRED</div>
      },
      {
        headerName: "level",
        field: "REQUEST_UNITY_ID",
        width: 150,
        filter: true,
        cellRendererFramework: params => params.value === 'EMPLOYEE' ? 'CLOSED' : params.value
      },
      {
        headerName: "Class",
        field: "CLASS_ID",
        width: 200,
        filter: true,
      },
      {
        headerName: "Deliberation",
        field: "RequestStep",
        width: 300,
        filter: true,
        cellRendererFramework: params => ['VALIDATED', 'REJECTED'].includes(params.data.RequestStep?.RSTEP_STATUS) ? params.value?.RSTEP_COMM :
          <div className="badge badge-warning px-5 py-2">N/A</div>
      },
      {
        headerName: "Problem date",
        field: "REQUEST_PBLM_DATE",
        filter: true,
        width: 200,
        cellRendererFramework: params => params.value ? <FormattedDate
          value={new Date(params.value)}
          year="numeric"
          month="long"
          day="2-digit"
        /> : null
      },
      {
        headerName: "Date dlocal-bootstrape creation",
        field: "createdAt",
        filter: true,
        width: 200,
        cellRendererFramework: params => params.value ? <FormattedDate
          value={new Date(params.value)}
          year="numeric"
          month="long"
          day="2-digit"
        /> : null
      },
    ]
  }
  
  HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  
  loadMessage({obj, open, message, severity}) {
    let object = obj || this
    object.setState({open, message, severity})
  }
  
  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }
  
  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }
  
  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }
  
  refreshCard = () => {
    this.setState({reload: true})
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }
  
  toggleCollapse = () => {
    this.setState(state => ({collapse: !state.collapse}))
  }
  onEntering = () => {
    this.setState({status: "Opening..."})
  }
  
  onEntered = () => {
    this.setState({status: "Opened"})
  }
  onExiting = () => {
    this.setState({status: "Closing..."})
  }
  onExited = () => {
    this.setState({status: "Closed"})
  }
  removeCard = () => {
    this.setState({isVisible: false})
  }
  
  confirmDeletion = (elt) => {
  }
  
  
  render() {
    const {columnDefs, defaultColDef, pageSize} = this.state
    return (
      <GlobalContext.Consumer>
        {context => {
          return (<div className="mx-auto py-4 px-0 local_boostrap">
            <Grid container spacing={2} className="mb-3">
              <Grid item md={2}>
                <Card className="shadow p-4 bg-card-5 h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Registered requests"/></CardTitle>
                    <div className="small">
                      <FormattedMessage id="Registered requests text"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalRegistered)}</div>
                </Card>
              </Grid>
              <Grid item md={2}>
                <Card className="shadow p-4 bg-card-3 h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Requests in progress"/></CardTitle>
                    <div className="small">
                      <FormattedMessage id="Requests in progress text"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalProcessing)}</div>
                </Card>
              </Grid>
              <Grid item md={2}>
                <Card className="shadow p-4 bg-card-2 h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Closed requests"/></CardTitle>
                    <div className="small">
                      <FormattedMessage id="Closed requests text"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalClose)}</div>
                </Card>
              </Grid>
              <Grid item md={2}>
                <Card className="shadow p-4 bg-card-4 h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Rejected requests"/></CardTitle>
                    <div className="small">
                      <FormattedMessage id="Rejected requests text"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalRejected)}</div>
                </Card>
              </Grid>
              <Grid item md={2}>
                <Card className="shadow p-4 bg-card-5 h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Total validated"/></CardTitle>
                    <div className="small"><FormattedMessage
                      id="The number of your requests that are already validated"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalValidated)}</div>
                </Card>
              </Grid>
              <Grid item md={2}>
                <Card className="shadow p-4 bg-light h-full flex flex-row items-center">
                  <div className='flex flex-col'>
                    <CardTitle className="h6 font-weight-bold"><FormattedMessage id="Month average"/></CardTitle>
                    <div className="small"><FormattedMessage id="The total number of your requests that you done"/>
                    </div>
                  </div>
                  <div
                    className="h5 mt-2 text-center ml-3">{FormatH.number(context.state.statRequestForUser.totalDone)}</div>
                </Card>
              </Grid>
            </Grid>
            <div>
              <Card className="border-0">
                <CardBody className="shadow rounded overflow-hidden">
                  <div className="ag-theme-material ag-grid-table">
                    <div className="ag-grid-actions flex justify-between flex-wrap mb-3">
                      <div className="sort-dropdown">
                        <UncontrolledDropdown className="ag-dropdown p-1">
                          <DropdownToggle tag="div">
                            1
                            - {pageSize} of {FormatH.number(context.state.requestConcernedAuthor?.length || 0)}
                            <ChevronDown className="ml-50" size={15}/>
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(20)}
                            >
                              20
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(50)}
                            >
                              50
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(100)}
                            >
                              100
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(150)}
                            >
                              150
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="filter-actions flex">
                        <Input
                          className="w-50 mr-2 mb-1 mb-sm-0"
                          type="text"
                          placeholder="search..."
                          onChange={e => this.updateSearchQuery(e.target.value)}
                          value={this.state.searchVal}
                        />
                        <div>
                          <Button
                            variant='outlined'
                            className="rounded small"
                            color="primary"
                            onClick={context.loadRequest}
                          >
                            <RefreshCw size={16} className="mr-1"/>
                            <FormattedMessage id="Refresh"/>
                          </Button>
                        </div>
                      </div>
                    </div>
                    {context.state.requestConcernedAuthor !== null ? (
                      <AgGridReact
                        gridOptions={{}}
                        rowSelection="multiple"
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={context.state.requestConcernedAuthor || []}
                        onGridReady={this.onGridReady}
                        colResizeDefault={"shift"}
                        animateRows={true}
                        // floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                      />
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>)
        }}
      </GlobalContext.Consumer>
    )
  }
}
