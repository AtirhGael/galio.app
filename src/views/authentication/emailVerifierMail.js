import React, {useContext} from "react";
import mailSent from '../../assets/img/mail-sent.svg'
import {Button} from "@material-ui/core";
import {FormattedMessage} from "react-intl";
import {GlobalContext} from "../../utilities/Global";

export default function EmailVerifierMail() {
  const context = useContext(GlobalContext)
  return (
    <div
      className="text-center relative h-full flex items-center justify-center flex-col">
      <div
        className="bg-white shadow-lg p-10 items-center justify-center rounded-lg max-h-[500px] col-md-6 py-4 py-md-0 h-full">
        <h3 className="text-center mb-2 text-uppercase"><FormattedMessage
          id="A confirmation message has been sent"/></h3>
        <p className="text-black-200 font-italic">
          <FormattedMessage id="Please check your spams"/>
        </p>
        <Button color="primary" className="mt-2 mb-3" onClick={() => context.navigate('/login')}>
          <div style={{fontSize: 24}}>
            <FormattedMessage id="Log in2"/>
          </div>
        </Button>
        <img src={mailSent} alt="#" className='mx-auto' width={250}/>
      </div>
    </div>
  );
}
