import React from "react";
import Icon from "@mdi/react";
import {mdiCertificateOutline} from "@mdi/js";
import {Button, Chip, Grid,} from "@material-ui/core";
import {Eye, Link2, RefreshCw, Trash2} from "react-feather";
import Avatar from "@material-ui/core/Avatar";
import DropzoneProgrammatically from "./dropzone/DropzoneProgrammatically";
import DiplomaService from "../../../../services/dilploma.s";
import {GlobalContext} from "../../../../utilities/Global";
import {FormattedMessage} from "react-intl";
import CVDropzoneProgrammatically from "./dropzone/CV-DropzoneProgrammatically";

export default class Training extends React.Component {

  state = {}

  componentDidMount() {
  }

  render() {

    const FileItem = ({item}) => {

      const removeDiploma = (context) => {
        new DiplomaService().remove(item).then(res => {
          if (res.status === 200)
            context.loadDiploma()
        })
      }

      return (
        <GlobalContext.Consumer>
          {context => {
            return (
              <Grid item xs={12} md={6} className='file-item'>
                <Grid container spacing={1}>
                  <Grid item xs={10}>
                    <div className='my-2'><FormattedMessage
                      id="Diploma or certification designation"/> : <strong>{item.DESIGNATION}</strong>
                    </div>
                    <div className='my-2'><FormattedMessage
                      id="Specialty"/> : <strong>{item.SPECIALITY}</strong></div>
                    <div className='my-2'><FormattedMessage id="Level"/>
                      : <strong>{item.LEVEL}</strong></div>
                    <div className='my-2'><FormattedMessage
                      id="Teaching language"/> : <strong>{item.LANGUAGE}</strong>
                    </div>
                    <div className='my-2'><FormattedMessage
                      id="Obtention date"/> : <strong>{item.OBTENEDDATE}</strong>
                    </div>
                    <div className='my-2'><FormattedMessage id="Obtention institution"/>
                      : <strong>{item.OBTENEDSTAB}</strong></div>
                  </Grid>
                  <Grid item xs={2}>
                    <div className='flex flex-col justify-between h-full'>
                      <div>
                        <div
                          className='flex justify-center flex-col items-center'>
                          <Avatar className='my-2 shadow' style={{height: 32, width: 32}}
                                  onClick={() => {
                                    window.open(item.FILE, '_blank')
                                  }}>
                            <Eye style={{height: 16}}/>
                          </Avatar>
                        </div>
                        {!context.state.ACTIVED &&
                        <div
                          className='flex justify-center flex-col items-center trash'>
                          <Avatar className='my-2 shadow bg-secondary'
                                  style={{height: 32, width: 32}}
                                  onClick={() => removeDiploma(context)}>
                            <Trash2 style={{height: 16}}/>
                          </Avatar>
                        </div>}
                      </div>
                      <div
                        className='mt-3 flex justify-end items-center'>
                        {!context.state.ACTIVED &&
                        <Chip
                          className='mb-2'
                          style={{fontSize: 10, fontWeight: '600'}}
                          avatar={
                            <Avatar
                              className={'my-2 shadow text-white ' + (context.state.LASTDIPLOMA === item.id ? 'bg-primary' : 'bg-danger')}
                              style={{height: 24, width: 24}}
                              disabled={context.state.ACTIVED}>
                              <Link2 style={{height: 12}}/>
                            </Avatar>}
                          label={context.state.LASTDIPLOMA === item.id ?
                            <FormattedMessage id="Your last diploma"/> :
                            <FormattedMessage id="Define as last diploma"/>}
                          onClick={() => context.defineLastDiploma(item.id)}>
                        </Chip>}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            )
          }}
        </GlobalContext.Consumer>
      )
    }

    return (
      <GlobalContext.Consumer>
        {context => {
          return (
            <div className='max-w-screen-lg mx-auto text-left'>
              <div className="md:flex flex-row-reverse justify-end block items-center">
                <div className='md:inline text-right text-md-left'>
                  <Button onClick={context.loadDiploma}>
                    <RefreshCw size={24} strokeWidth={1}/>
                    <span className='md:none'>&nbsp;&nbsp;<FormattedMessage id="Refresh"/></span>
                  </Button>
                </div>
                <h5 className='mt-3 mb-3 flex items-center mr-1 px-0'>
                                    <span className='hidden md:inline'><Icon path={mdiCertificateOutline}
                                                                               size={1}/>&nbsp;&nbsp;</span>
                  <span className='mr-2'><FormattedMessage id={'Diplomas and certifications'}/></span>
                </h5>
              </div>
              <div className='mt-3 mb-4'>
                <Grid container spacing={3}>
                  {context.state.files?.map((elt, i) => (<FileItem key={i} item={elt}/>))}
                </Grid>
                {!context.state.ACTIVED &&
                <div
                  className='file-item-upload-space flex justify-center items-center mt-4'>
                  <DropzoneProgrammatically/>
                </div>}

                <div className='mr-5 h5 mt-4 mb-2'>Curriculum Vitae</div>
                <div>
                  <div
                    className='file-item-upload-space flex justify-center items-center mt-2'>
                    {context.state.CV_LINK ? (<div className='flex items-center'>
                      <a href={context.state.CV_LINK}><FormattedMessage
                        id="Curriculum vitae"/></a>
                      {!context.state.ACTIVED && <Avatar className='my-2 shadow bg-secondary ml-2'
                                                         style={{height: 32, width: 32}}
                                                         onClick={() => context.removeDiploma('CV_LINK')}
                      >
                        <Trash2 style={{height: 16}}/>
                      </Avatar>}
                    </div>) : context.state.ACTIVED ? null :
                      <CVDropzoneProgrammatically
                        text={'Click here to upload your CV'}
                        col={'CV_LINK'} context={context}/>
                    }
                  </div>


                </div>
              </div>
            </div>
          )
        }}
      </GlobalContext.Consumer>
    )
  }
}