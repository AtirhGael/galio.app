import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Chip, IconButton, Tooltip} from "@material-ui/core";
import {Button} from "reactstrap";
import AppChoiceS from "../../../../../../services/appChoice.s";
import CookieH from "../../../../../../helpers/cookie.h";
import ClearConfirm from "../../../../dialog/clearConfirm";
import CloseConfirm from "../../../../dialog/closeConfirm";
import AppS from "../../../../../../services/app.s";
import {useNavigate} from "react-router-dom";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import * as _ from "lodash";
import AlreadyClosed from "../../../../dialog/alreadyClosed";
import {GlobalContext} from "../../../../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import {Trash} from "react-feather";

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);


export default function CourseChoises(props) {
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [openCloseConfirm, setOpenCloseConfirm] = React.useState(false);
  const [openAlreadyExpired, setOpenAlreadyExpired] = React.useState(false);
  const navigate = useNavigate();
  
  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  
  const createOrUpdate = (context) => {
    context.openBackdrop()
    return new AppChoiceS().createOrUpdate({
      subjects: [...context.state.selected.map(e => ({
        SUBJECT_ID: e.SUBJECT_ID,
        id: e.CHOICE,
        CATEGORY: e.CAT
      })), ...context.state.selectedConfirmed.map(e => ({
        SUBJECT_ID: e.SUBJECT_ID,
        id: e.CHOICE,
        CATEGORY: e.CAT
      })) || []],
      application: CookieH.getApplication()?.id
    }).then(res => {
      if (res.status === 200) {
        context.setState({
          openSb: true,
          userAppSession: true,
          severitySb: 'success',
          messageSb: 'Courses updated successfully'
        })
      }
      return res
    }, err => {
      if (err.status === 401)
        setOpenAlreadyExpired(true)
      return err
    }).finally(() => {
      context.closeBackdrop()
    })
  }
  const clear = (context) => {
    new AppChoiceS().clear(CookieH.getApplication()?.id
    ).then(res => {
      if (res.status === 200) {
        context.setState({
          selected: [],
          openSb: true,
          severitySb: 'success',
          messageSb: 'Your selection list has been emptied'
        })
      }
    })
  }
  
  return (
    <GlobalContext.Consumer>
      {context => {
        
        const endSession = () => {
          new AppS().close(CookieH.getApplication().id).then(res => {
            if (res.status === 200) {
              let app = {...CookieH.getApplication(), CLOSED: true}
              CookieH.setApplication(app)
              navigate('/courses')
            }
          }, err => {
            if (err.status === 401)
              setOpenAlreadyExpired(true)
          })
        }
        
        const close = () => {
          if (context.state.userAppSession) {
            endSession()
          } else {
            createOrUpdate(context).then(res => {
              if (res.state === 200)
                endSession()
            })
          }
        }
        
        return (
          <div className='w-full'>
            <ClearConfirm open={openDeleteConfirm} setClose={() => setOpenDeleteConfirm(false)}
                          clear={() => clear(context)}/>
            <CloseConfirm open={openCloseConfirm} selected={context.state.selected}
                          setClose={() => setOpenCloseConfirm(false)}
                          close={close}/>
            <AlreadyClosed open={openAlreadyExpired} setClose={() => setOpenAlreadyExpired(false)}/>
            <div className='flex px-2 items-center pt-2 mb-2'>
              <div className='col h5 font-weight-light'>
                <FormattedMessage id="Your choices list"/>
              </div>
            </div>
            <div className='h-full pb-4' style={{overflowY: 'auto'}}>
              <div className='choices-list p-2 rounded bg-white'
                   style={{
                     maxHeight: 'calc(100vh - 200px)',
                     minHeight: 'calc(100vh - 200px)',
                     overflowY: 'auto'
                   }}>
                {_.orderBy(_.uniqBy(context.state.selected, 'LEVEL_ID'), ['LEVEL_ID'], ['asc']).map((elt, key) => (
                  <Accordion square key={key}>
                    <AccordionSummary className='flex items-center'>
                      <div className='col flex items-center'>Niveau {elt.LEVEL_ID}</div>
                      <IconButton onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        
                        let group = context.state.selected.filter(sub => sub.LEVEL_ID === elt.LEVEL_ID)
                        let selected = context.state.selected.filter(elt => !group.find(cho => cho === elt))
                        context.setState({selected, userAppSession: false})
                      }}>
                        <Trash size={16}/>
                      </IconButton>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div>
                        {_.uniqBy(context.state.selected.filter(sub => sub.LEVEL_ID === elt.LEVEL_ID), 'SUBJECT_ID').map((course, index) => (
                          <HtmlTooltip
                            key={index}
                            title={<div>
                              <div>{course.SUBJECT_NAME?.split('(')[0]}</div>
                            </div>}
                          >
                            <Chip
                              variant="outlined"
                              size="small"
                              style={{
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                maxWidth: 300,
                                height: 'auto',
                              }}
                              className='mr-2 mb-2 py-2 px-0'
                              label={
                                <h6 style={{
                                  fontSize: 13,
                                  margin: 0,
                                  whiteSpace: 'initial',
                                  textTransform: 'capitalize'
                                }} className=''>{course.SUBJECT_NAME} </h6>
                              }
                              onDelete={() => {
                                let group = context.state.selected.filter(sub => sub.SUBJECT_ID === course.SUBJECT_ID && sub.CLASS_ID === course.CLASS_ID)
                                let selected = context.state.selected.filter(elt => !group.find(cho => cho === elt))
                                context.setState({selected, userAppSession: false})
                              }}
                            />
                          </HtmlTooltip>
                        
                        ))}
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
              <div className='mt-3 text-right'>
                <Button
                  disabled={context.state.selected.length === 0 || false}
                  className='text-uppercase shadow border-0 bg-danger btn btn-sm text-white mr-2'
                  onClick={() => setOpenDeleteConfirm(true)}
                ><FormattedMessage id="Clear"/></Button>
                <Button
                  disabled={context.state.userAppSession}
                  className='text-uppercase shadow border-0 bg-primary btn btn-sm text-white mr-2'
                  onClick={() => createOrUpdate(context)}
                ><FormattedMessage id="Save Continue"/></Button>
                <Button
                  className='text-uppercase shadow border-0 bg-success btn btn-sm text-white mr-2'
                  onClick={() => setOpenCloseConfirm(true)}
                ><FormattedMessage id="Save Lock"/></Button>
              </div>
            </div>
          </div>
        )
      }}
    </GlobalContext.Consumer>
  );
}
