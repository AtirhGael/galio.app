import React, {useContext, useEffect} from "react";
import Button from "@material-ui/core/Button";
import logoIUC from '../../assets/img/iuc-logo.png'
import {Form} from "reactstrap";
import {FormattedMessage} from "react-intl";
import useDigitInput from "react-digit-input";
import {GlobalContext} from "../../utilities/Global";
import {useLocation} from "react-router-dom";

export default function CodeVerifier() {
  const [value, onChange] = React.useState('');
  const [matricule, setMatricule] = React.useState();
  const location = useLocation()
  const context = useContext(GlobalContext)
  const [email, setEmail] = React.useState();
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length: 6,
    value,
    onChange,
  });
  
  useEffect(() => {
    setMatricule(location.state.matricule)
    setEmail(location.state.email)
    // eslint-disable-next-line
  }, [])
  return (
    <div className="h-full w-full justify-center items-center md:flex block relative"
    >
      <div
        className="px-0 px-md-2 h-full col-12 col-xl-7 col-lg-10 col-md-8 flex justify-center">
        <div className="flex items-center flex-row main-sign">
          <div className="bg-white mb-0 pb-2 w-full lg-mx-5 rounded-lg shadow-xl main-sign">
            <div className="pb-1 bg-gray-50 px-8 border-b pt-8">
              <div>
                <img src={logoIUC} alt={"#"}/>
              </div>
            </div>
            <div className="card-body pb-8 pt-3 px-8 ">
              <Form onSubmit={(e) => {
                e.preventDefault()
                // context.login(this.state.email, this.state.matricule)
              }} className="form h-full">
                <FormattedMessage
                  id='Please enter the code that your receive from the mail to sign into your account.'/>
                <div className="input-group mt-4 mb-3">
                  <input inputMode="decimal" autoFocus {...digits[0]} />
                  <input inputMode="decimal" {...digits[1]} />
                  <input inputMode="decimal" {...digits[2]} />
                  <span className="hyphen"/>
                  <input inputMode="decimal" {...digits[3]} />
                  <input inputMode="decimal" {...digits[4]} />
                  <input inputMode="decimal" {...digits[5]} />
                </div>
                {context.state.CODE_ERROR ?
                  <div className='text-danger mb-3 text-center'>
                    <FormattedMessage id='The code you entered is incorrect'/></div> : '   '}
                <div>
                  <Button
                    className="w-full"
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      context.codeVerificator(value, matricule)
                    }}>
                    <FormattedMessage id="Verify code"/>
                  </Button>
                </div>
                <div className="py-3 text-center">
                  <FormattedMessage id="Don't you receive the code?"/>&nbsp;&nbsp;
                  <span
                    className='cursor-pointer'
                    style={{color: 'dodgerblue'}}
                    onClick={() => {
                      onChange('')
                      context.setState({CODE_ERROR: false})
                      context.loginStepForSendCode(email, matricule)
                    }}><FormattedMessage
                    id="Re-send the code"/></span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}
