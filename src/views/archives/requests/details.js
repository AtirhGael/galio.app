import * as React from 'react';
import {useEffect} from 'react';
import {Eye} from "react-feather";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {decode} from "url-encode-decode";
import {FormattedDate, FormattedMessage} from "react-intl";
import ReqS from "../../../services/req.s";
import CookieH from "../../../helpers/cookie.h";

export default function Details({REQUEST_ID}) {
  const [open, setOpen] = React.useState(false);
  const [request, setRequest] = React.useState({});
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if (open) {
      new ReqS().getById(REQUEST_ID).then(res => {
        console.log(request)
        if (res.status === 200)
          setRequest(res.data)
      })
    }
    // eslint-disable-next-line
  }, [open])
  
  return (
    <div>
      <span
        className='shadow p-2 rounded border cursor-pointer w-8 h-8 flex'
        onClick={handleClickOpen}>
        <Eye size={18}/>
      </span>
      <Dialog
        open={open}
        fullWidth
        maxWidth='md'
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Details
        </DialogTitle>
        <DialogContent>
          <div className={`email-app-details h-full overflow-hidden`}
          >
            <div className="email-scroll-area">
              <div>
                <div sm="12" className="mt-3">
                  <div key={request?.id} className="px-1">
                    <div className="email-detail-head ml-75">
                      <div className="mb-2 flex justify-between items-center flex-wrap">
                        <div className="avatar shadow border rounded overflow-hidden">
                          <img
                            src={`http://192.168.0.90:8080/media/picture/${CookieH.getUser()?.MATRICULE}`}
                            alt="Question Img"
                            height="108"
                            width="108"
                          />
                        </div>
                        <div className="col">
                          <h6 className="my-1">Matricule : {request?.Employee?.MATRICULE}</h6>
                          <h6 className="mb-1">Objet : {request?.REQUEST_OBJECT}</h6>
                          <div className="mail-meta-item">
                            <div className="mail-time mb-1">
                              Créé le &nbsp;
                              <FormattedDate
                                value={new Date(request?.createdAt || new Date())}
                                year="numeric"
                                month="long"
                                day="2-digit"
                              />
                            </div>
                            <div className="mail-date mb-1">
                              Mise à jour le &nbsp;
                              <FormattedDate
                                value={new Date(request?.updatedAt || new Date())}
                                year="numeric"
                                month="long"
                                day="2-digit"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mt-2">
                        <h4 className="m-0">REFERENCE: <span className='badge badge-danger'>{request?.REQUEST_ID}</span>
                        </h4>
                      </div>
                    </div>
                    <div className="mail-message-wrapper pt-2 mb-0">
                      <div className="mail-message">
                        <h5>MOTIF: {request?.RequestCategory?.S_CATEGORIE} <span
                          className="badge badge-success">{request?.RequestCategory?.ID_SCAT}</span></h5>
                        <h4 className='mt-4'>Description</h4>
                        <p>{decode(request?.DESCRIPTION)}</p>
                        <h5 className='flex items-center'>
                          <div>Pour une revendication
                            du &nbsp;<span
                              className="badge badge-info">{request?.REQUEST_PBLM_DATE || "N/A"}</span>&nbsp;&nbsp;
                          </div>
                          pour la prestation de &nbsp;&nbsp;
                          <div
                            className="badge badge-info">{request?.REQUEST_PBLM_HOUR_START?.split('T')[1]?.split('.')[0] || "N/A"}</div>
                          &nbsp;&nbsp;à&nbsp;&nbsp;
                          <div
                            className="badge badge-warning">{request?.REQUEST_PBLM_HOUR_END?.split('T')[1]?.split('.')[0] || "N/A"}</div>
                        </h5>
                        <h6 className='flex items-center mt-3'>
                          <div>Pour la
                            classe: &nbsp;&nbsp;{request?.CLASS_ID || "N/A"}&nbsp;&nbsp;</div>
                        </h6>
                        <h6>Code matiere :&nbsp;&nbsp;{request?.SUBJECT_ID || "N/A"}</h6>
                        <h6>Ecole :&nbsp;&nbsp;{request?.Class?.BRANCH_NAME || "N/A"}</h6>
                      </div>
                    </div>
                    {/*<Plannings data={this?.props.state?.dataPlanning || []}/>*/}
                    {request?.RequestStep && (
                      <React.Fragment>
                        <div className="mail-files py-2">
                          <div className="chip-body py-50">
                            <h5>STATUS: <span className="badge badge-danger">{request?.RequestStep.RSTEP_STATUS}</span></h5>
                            <div className="chip-text">{request?.RequestStep.RSTEP_COMM}</div>
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            <FormattedMessage id='OK'/>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
