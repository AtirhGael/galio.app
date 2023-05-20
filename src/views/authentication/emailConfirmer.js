import React, {useContext, useEffect, useState} from "react";
import {Button, CircularProgress} from "@material-ui/core";
import mailConfirmed from '../../assets/img/mail-confirmed.svg'
import sessionExpired from '../../assets/img/mail-session-expired.svg'
import {FormattedMessage} from "react-intl";
import AuthS from "../../services/auth.s";
import {GlobalContext} from "../../utilities/Global";
import {useLocation} from "react-router-dom";

export default function EmailConfirmer(props) {
  
  const context = useContext(GlobalContext)
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(true)
  const [message, setMessage] = useState(<FormattedMessage id="We are verifying your adress"/>)
  const [img, setImg] = useState(mailConfirmed)
  
  useEffect(() => {
    new AuthS().confirmEmail(location.search.split('=')[1]).then(res => {
      if (res.status === 200) {
        setLoading(false)
        setOk(true)
        setImg(mailConfirmed)
        setMessage(<FormattedMessage id="Your adress has benn successfully verified"/>)
      }
    }, err => {
      if (err.status === 401) {
        setLoading(false)
        setOk(false)
        setImg(sessionExpired)
        setMessage(<FormattedMessage id="The time allowed to the confirmation has expired"/>)
      }
    })
  }, [])
  
  return (<div
    className="text-center relative h-full flex items-center justify-center flex-col ">
    <div className='shadow-lg max-w-xl w-full bg-white flex items-center justify-center flex-col rounded-xl py-8'>
      <h3 className="text-center mb-2 text-uppercase w-50" style={{lineHeight: 1.5}}>{message}</h3>
      <Button style={{fontSize: 40}} color="primary" className="mt-2 mb-3"
              onClick={() => context.navigate('/login')}>
        {loading ? <CircularProgress size={12} color="secondary"/> : ok && <FormattedMessage id="Log in"/>}</Button>
      <img src={img} alt="#" height={250} width={300}/>
    </div>
  </div>)
}
