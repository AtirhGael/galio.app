import React from "react";
import {Grid} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {FormattedMessage} from "react-intl";
import FormatH from "../../../helpers/format.h";
import * as _ from "lodash";
import {CheckCircle, Info, XCircle} from "react-feather";
import emptyChoice from "./../../../assets/img/emptyChoice.svg";
import {Skeleton} from "@material-ui/lab";

const ChoicesList = ({item}) => {
    return (
        <Grid item md={4} key={item.id}>
            <Accordion defaultExpanded expanded={true}>
                <AccordionSummary
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <h5 className='text-uppercase'>{item.SessionApplication.DESIGNATION}</h5>
                </AccordionSummary>
                <div className='px-3 py-0'>
                    {item.ApplicationChoices.length > 0 ?
                        <div>
                            {/*<h6 className='font-weight-light mb-2'><FormattedMessage*/}
                            {/*    id="Total hourly volume"/>&nbsp;&nbsp;*/}
                            {/*    <strong>*/}
                            {/*        {FormatH.number(_.sum(item.ApplicationChoices.map(e => e.Subject['SUBJECT_VH_' + e.CATEGORY + '_INITIAL'])))}*/}
                            {/*        <FormattedMessage id="hours"/>*/}
                            {/*    </strong>*/}
                            {/*</h6>*/}
                            <h6><FormattedMessage id="Your choices list"/>({FormatH.number(item?.ApplicationChoices?.length)})</h6>
                            <div>
                                <ul className='pl-0 mt-2'>
                                    {_.uniqBy(item?.ApplicationChoices?.map((e) => e.Subject), (item) => item.SUBJECT_ID + item.CLASS_ID).map((course, i) => (
                                        <li key={i}
                                            style={{paddingBottom: 4, paddingTop: 4, listStyle: 'none'}}
                                            className='border-bottom'>
                                            <div className='flex items-center'>
                                                <div className='col px-0 flex flex-wrap items-center'>
                                                    <div style={{marginTop: 4}}>
                                                        {course?.SUBJECT_SHORTNAME}
                                                    </div>
                                                    <div
                                                        className='col-md-auto pl-0 text-black-50 small mt-2 ml-2'>{course?.CLASS_ID}</div>
                                                    &nbsp;
                                                    <div style={{marginTop: 4}}>
                                                        <strong
                                                            className='text-info    '>
                                                            {item?.ApplicationChoices?.filter(app => app?.Subject?.SUBJECT_ID === course?.SUBJECT_ID && course?.CLASS_ID === app?.Subject?.CLASS_ID).map(el => (
                                                                <span
                                                                    className={[el.AFFECTATION === -1 ? 'text-info ' : (el.AFFECTATION === 1 ? 'text-success ' : 'text-danger '), ' mr-2']}>{el?.CATEGORY}{el.AFFECTATION === 1 ?
                                                                    <CheckCircle
                                                                        size='20'
                                                                        className='text-success font-weight-bold ml-2'/> : (item.AFFECTATION === 0 ?
                                                                        <XCircle size='20'
                                                                                 className='text-danger font-weight-bold ml-2'/> :
                                                                        <Info size='20'
                                                                              className='text-warning font-weight-bold ml-2'/>)}</span>
                                                                ))
                                                                }
                                                            {item?.Subject?.CLASS_ID}
                                                                </strong>
                                                                </div>
                                                                </div>
                                                            {course?.SUP_AUTHOR}
                                                                </div>
                                                                </li>
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div className='text-black-50 break-word'><FormattedMessage
                                                        id="No assignment has been made for this choice session"/></div>
                                                    <div className='text-center p-3 flex items-center'>
                                                        <img src={emptyChoice} alt="empty choice list" height={72}/>
                                                        <div className='w-full ml-4'>
                                                            <Skeleton/>
                                                            <Skeleton animation={false}/>
                                                            <Skeleton animation="wave"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                }
                            </div>
                        </Accordion>
                        </Grid>
                        )
                    }
                    export default ChoicesList