import React from "react";
import CookieH from "../../helpers/cookie.h";
import Closed from "./states/closed";
import Current from "./states/current/current";
import None from "./states/none";
import {GlobalContext} from "../../utilities/Global";

export default () => (
  <GlobalContext.Consumer>
    {context => (
      <div className="max-w-screen-2xl mx-auto p-12 relative shadow-2xl bg-gradient-to-r from-gray-50 bg-white rounded-xl"
           style={{minHeight: '78vh'}}>
        {!context.state.sesApp ? <None/> : (CookieH.getApplication()?.CLOSED ? <Closed/> :
          <Current/>)}
      </div>
    )}
  </GlobalContext.Consumer>
)